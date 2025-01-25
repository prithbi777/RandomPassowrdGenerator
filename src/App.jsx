import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setpassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += "0123456789";
    if (charAllow) str += "@#$%&*!+-/";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllow, charAllow]);

  const passwordRef = useRef(null);

  const copypassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    alert("Password Copied!");
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, charAllow, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-4 my-8 bg-white text-black">
      <h1 className="text-black text-2xl font-bold text-center my-4">Password Generator!</h1>

      <div className="flex flex-col sm:flex-row shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-3 text-sm sm:text-base bg-gray-100"
          placeholder="Generated Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copypassword}
          className="bg-yellow-300 text-black px-3 py-2 text-sm sm:text-base font-bold shrink-0 hover:bg-yellow-400"
        >
          Copy
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="font-bold text-sm sm:text-base">Length: {length}</label>
          <input
            type="range"
            min={8}
            max={15}
            value={length}
            className="cursor-pointer w-full sm:w-auto"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="flex items-center gap-2 font-bold text-sm sm:text-base">
            <input
              type="checkbox"
              checked={numberAllow}
              onChange={() => setnumberAllow((prev) => !prev)}
            />
            Include Numbers
          </label>
          <label className="flex items-center gap-2 font-bold text-sm sm:text-base">
            <input
              type="checkbox"
              checked={charAllow}
              onChange={() => setcharAllow((prev) => !prev)}
            />
            Include Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
