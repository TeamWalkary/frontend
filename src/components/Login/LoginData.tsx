import { useNavigate } from "react-router-dom";
import useInputValue from "../../hooks/useInputValue";
import Input from "../Common/Input";
import Button from "../Common/Button";

const LoginData = () => {
  const initInputValue = {
    id: "",
    pw: "",
  };

  const { inputValue, handleInput } = useInputValue(initInputValue);

  const eng = /^[a-zA-Z]*$/;
  const idValid: boolean = eng.test(inputValue.id);
  // const pwValid: boolean = inputValue.pw.length > 0;
  const isValid: boolean = !!inputValue.id && !!inputValue.pw;

  const navigate = useNavigate();

  const postUserData = () => {
    fetch(`${import.meta.env.REACT_APP_IP}/apis/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: inputValue.id,
        password: inputValue.pw,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.message === "Login successful") {
          localStorage.setItem("token", data.token);
          navigate("/main");
        } else if (data.message === "잘못된 id 혹은 password 입니다.") {
          alert("아이디 또는 비밀번호 다시 확인해주세요.");
        }
      });
  };

  return (
    <>
      <Input
        name={"id"}
        type={"text"}
        title={"아이디"}
        placeholder={"아이디"}
        validText={"아이디를 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={idValid}
      />
      <Input
        name={"pw"}
        type={"password"}
        title={"비밀번호"}
        placeholder={"비밀번호"}
        validText={"비밀번호를를 입력해주세요."}
        required
        handleInput={handleInput}
        isValid={true}
      />
      <Button
        placeholder={"로그인"}
        isValid={isValid}
        postUserData={postUserData}
      />
    </>
  );
};

export default LoginData;
