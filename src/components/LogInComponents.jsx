import { useState } from "react";
import Image from "next/image";
import eyePasswordShow from "../../public/images/eye-password-show.svg";
import eyePasswordHide from "../../public/images/eye-password-hide.svg";

const Title = ({ id, name }) => {
  return (
    <label
      htmlFor={id || "password"}
      className="block text-xl text-gray-800 font-semibold"
    >
      {name || "Password"}
    </label>
  );
};
const InputBox = ({
  id,
  value,
  setFunc,
  showPassword,
  setShowPassword,
  type,
}) => {
  return (
    <div className="relative">
      <input
        type={type === "password" && !showPassword ? "password" : "text"}
        id={id || "password"}
        value={value}
        onChange={(e) => setFunc(e.target.value)}
        className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        required
      />
      <HideButton
        id={id}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
    </div>
  );
};
const HideButton = ({ id, showPassword, setShowPassword }) => {
  return (
    <>
      {id == "password" ? (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          <Image
            src={showPassword ? eyePasswordShow : eyePasswordHide}
            alt="Toggle Password Visibility"
            width={24}
            height={24}
          />
        </button>
      ) : (
        ""
      )}
    </>
  );
};
const LogInInputField = ({ name, type, id, value, setFunc }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <Title id={id} name={name} />
      <InputBox
        id={id}
        value={value}
        setFunc={setFunc}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        type={type}
      />
    </div>
  );
};
export default LogInInputField;
