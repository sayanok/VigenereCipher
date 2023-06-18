import React, { useState } from "react";

const App: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [resultText, setResultText] = useState("");
  const [encryptionKey, setEncryptionKey] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

    setResultText(resultText);
  }

  function encode() {}

  function decode() {}

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
      <textarea>{resultText}</textarea>
    </>
  );
};

export default App;
