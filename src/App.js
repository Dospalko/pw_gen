import Checkbox from "./components/Checkbox";
import { useState } from "react";

export default function App() {
  const [password, setPassword] = useState({
    length: 5,
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const [handleText, setHandleText] = useState("");

  const [copied, setCopied] = useState(false);

  const handleChangeUppercase = () => {
    setPassword({
      ...password,
      uppercase: !password.uppercase,
    });
  };
  const handleChangeLowercase = () => {
    setPassword({
      ...password,
      lowercase: !password.lowercase,
    });
  };
  const handleChangeSymbols = () => {
    setPassword({
      ...password,
      symbols: !password.symbols,
    });
  };
  const handleChangeNumbers = () => {
    setPassword({
      ...password,
      numbers: !password.numbers,
    });
  };

  const setPasswordLength = (val) => {
    setPassword({
      ...password,
      length: val,
    });
  };

  function generatePassword() {
    const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const symbolsArray = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];

    const characterCodes = Array.from(Array(26)).map((_e, i) => i + 97);
    const lowerCaseLetters = characterCodes.map((code) =>
      String.fromCharCode(code)
    );
    const upperCaseLetters = lowerCaseLetters.map((letter) =>
      letter.toUpperCase()
    );

    const { length, uppercase, lowercase, numbers, symbols } = password;

    const generateTheWord = (
      length,
      uppercase,
      lowercase,
      numbers,
      symbols
    ) => {
      const availableCharacters = [
        ...(lowercase ? lowerCaseLetters : []),
        ...(uppercase ? upperCaseLetters : []),
        ...(numbers ? numbersArray : []),
        ...(symbols ? symbolsArray : []),
      ];
      const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
      const characters = shuffleArray(availableCharacters).slice(0, length);
      setHandleText(characters.join(''));
      return characters;
    };

    generateTheWord(length, uppercase, lowercase, numbers, symbols);
  }

  return (
    <div class="flex  bg-[#191308] h-screen">
      <div class="m-auto bg-[#322A26] sm:h-[500px] h-[600px]  w-[300px] sm:w-1/4 md:w-1/2 l:w-1/4 xl:w-1/4">
        <h2 class="w-1/2  pt-10 ml-5  antialiased font-bold text-white fw-bold italic text-xl">
          Password generator
        </h2>
        <div class="sm:flex justify-between">
          <input
            type="text"
            value={handleText}
            onChange={(e) => setHandleText(e.target.value)}
            autoComplete="off"
            placeholder="heslo"
            class="ml-5 mt-10 p-2 sm:w-[300px] rounded"
          ></input>
          <button
            type="button"
            onClick={() => {
              if (handleText.length > 0) {
                navigator.clipboard.writeText(handleText);
                setCopied(true);
                setInterval(() => {
                  setCopied(false);
                }, 2000);
              }
            }}
            class="rounded-lg text-sm  text-center mt-3 sm:mt-10 mr-4 py-2 px-4 sm:px-9 ml-4  bg-[#454B66] text-white flex-none"
          >
            {copied ? 'Copied!' : 'Copy text'}
          </button>
        </div>
        <div class="w-full mt-5 flex justify-between">
          <label class="text-white ml-5">Password length</label>
          <input
               type="number"
               min="4"
               max="20"
               value={password.length}
               onChange={(e) => setPasswordLength(e.target.value)}
            class="w-1/6 mr-4 "
          />
        </div>
        <div class="w-full mt-5 flex justify-between">
          <label class="text-white ml-5">Include capital letters</label>
          <Checkbox
            value={password.uppercase}
            onChange={handleChangeUppercase}
          />
        </div>
        <div class="w-full mt-5 flex justify-between">
          <label class="text-white ml-5">Include small letters</label>
          <Checkbox
            value={password.lowercase}
            onChange={handleChangeLowercase}
          />
        </div>
        <div class="w-full mt-5 flex justify-between">
          <label class="text-white ml-5">Numbers</label>
          <Checkbox value={password.numbers} onChange={handleChangeNumbers} />
        </div>
        <div class="w-full mt-5 flex justify-between">
          <label class="text-white ml-5">Symbols</label>
          <Checkbox value={password.symbols} onChange={handleChangeSymbols} />
        </div>
        <button
          onClick={generatePassword}
          class="rounded-lg bg-white mx-auto flex mt-10 px-10 py-5"
        >
          Generate password
        </button>
      </div>
    </div>
  );
}
