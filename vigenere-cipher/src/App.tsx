import React, { useState } from "react";

const App: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const alphabet = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];

  function onChangeHandler(element: string, value: string) {
    if (validator(value)) {
      setErrorMessage("");
      if (element === "inputText") {
        setInputText(value);
      } else {
        setEncryptionKey(value);
      }
    } else {
      setErrorMessage("小文字のアルファベットのみ入力可能です");
    }
  }

  function validator(value: string) {
    const regex = /[^a-z]/g;
    const found = value.match(regex);
    if (found && found.length >= 1) {
      return false;
    } else {
      return true;
    }
  }

  function onClickHandler(element: string) {
    if (element === "encode") {
      encode();
    } else {
      decode();
    }
  }

  function encode() {
    let result = [];
    for (let n = 0; inputText.length > n; n++) {
      let inputTextNumber = alphabet.findIndex((element) => element === inputText.charAt(n));
      let encryptionKeyNumber;

      if (n >= encryptionKey.length) {
        encryptionKeyNumber = alphabet.findIndex(
          (element) => element === encryptionKey.charAt(n - encryptionKey.length)
        );
      } else {
        encryptionKeyNumber = alphabet.findIndex((element) => element === encryptionKey.charAt(n));
      }

      inputTextNumber + encryptionKeyNumber >= 26
        ? result.push(alphabet[(inputTextNumber + encryptionKeyNumber) % 26])
        : result.push(alphabet[inputTextNumber + encryptionKeyNumber]);
    }

    setResultText(result.join(""));
  }

  function decode() {
    let result = [];
    for (let n = 0; inputText.length > n; n++) {
      let inputTextNumber = alphabet.findIndex((element) => element === inputText.charAt(n));
      let encryptionKeyNumber;

      if (n >= encryptionKey.length) {
        encryptionKeyNumber = alphabet.findIndex(
          (element) => element === encryptionKey.charAt(n - encryptionKey.length)
        );
      } else {
        encryptionKeyNumber = alphabet.findIndex((element) => element === encryptionKey.charAt(n));
      }

      inputTextNumber - encryptionKeyNumber <= 0
        ? result.push(alphabet[(inputTextNumber - encryptionKeyNumber) % 26])
        : result.push(alphabet[inputTextNumber - encryptionKeyNumber]);
    }

    setResultText(result.join(""));
  }

  return (
    <>
      <p>テキスト</p>
      <textarea onChange={(e) => onChangeHandler("inputText", e.target.value)}>{inputText}</textarea>

      <p>暗号化キー</p>
      <input onChange={(e) => onChangeHandler("encryptKey", e.target.value)} value={encryptionKey}></input>

      <p>{errorMessage}</p>

      <div>
        <button onClick={() => onClickHandler("encode")}>暗号化</button>
        <button onClick={() => onClickHandler("decode")}>復号化</button>
      </div>

      <p>結果</p>
      {resultText}
    </>
  );
};

export default App;
