import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  //const error = useRouteError();

  return (
    <div>
      <p style={{color: "red", fontSize:"30px"}}>
        {"404 Page Not Found"}
      </p>
    </div>
  );
}
