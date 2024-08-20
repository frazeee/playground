import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState({
    text: "",
    pencilType: "",
    pencilColor: "",
    length: "",
  });

  const [textToUpdate, setTextToUpdate] = useState({
    text: "",
    pencilType: "",
    pencilColor: "",
    length: "",
  });

  const [error, setError] = useState({
    password: "",
    email: "",
  });

  const [pencil, setPencil] = useState("");

  const [texts, setTexts] = useState([]);

  const onPencilChange = (pencilSelected) => {
    setText({
      ...text,
      pencilType: pencilSelected,
      pencilColor: pencilSelected === "Graphite" ? "Black" : "Red",
      text: "",
      length: "",
    });
  };

  const onTextChange = (e) => {
    setText({
      ...text,
      text: e.target.value,
      length: e.target.value.length,
    });
  };

  const onUpdateTextChange = (e, text) => {
    setTextToUpdate({
      text: e.target.value,
      length: e.target.value.length,
    });
  };

  const [response, setResponse] = useState({
    data: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError({ ...error, password: "", email: "" });
    console.log(text);
    try {
      const response = await axios.post("http://localhost:5000/text", text);
      setResponse(response);
      console.log("Data Posted: ", response);
    } catch {
      console.log("Error: ", response);
    }
  };

  const handleGetTexts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/text");
      setTexts(response);
      console.log("Data Retrieved: ", response);
    } catch {
      console.log("Error: ", response);
    }
  };

  const deleteText = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/text/${id}`);
      setResponse(response);
      console.log("Data Deleted: ", response);
    } catch {
      console.log("Error: ", response);
    }
  };

  const updateText = async (text) => {
    console.log(textToUpdate);
    try {
      const response = await axios.put(
        `http://localhost:5000/text/${text._id}`,
        textToUpdate
      );
      setResponse(response);
      console.log("Data Updated: ", response);
    } catch {
      console.log("Error: ", response);
    }
  };

  useEffect(() => {
    handleGetTexts();
  }, [response]);

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // const validatePassword = (password) => {
  //   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //   return passwordRegex.test(password);
  // };

  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
        <div className="card my-5 w-50 p-3">
          <div className="card-body d-flex justify-content-center">
            <button
              className="btn btn-primary mx-5"
              onClick={() => onPencilChange("Graphite")}
            >
              Graphite Pencil
            </button>
            <button
              className="btn btn-primary mx-5"
              onClick={() => onPencilChange("Coloured")}
            >
              Coloured Pencil
            </button>
          </div>
        </div>

        <div className="card w-50 p-3">
          <h2>Pick a pencil to type..</h2>
          <div className="card-body ">
            {text.pencilType === "Graphite" && (
              <div>
                <form onSubmit={onSubmit} method="POST">
                  <h4>{text.pencilType} Pencil</h4>

                  <textarea
                    className="w-100"
                    maxLength={50}
                    value={text.text}
                    onChange={(e) => onTextChange(e)}
                    required
                  />
                  <p>
                    <b>Text Count: </b>
                    {50 - text.length}
                  </p>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            )}

            {text.pencilType === "Coloured" && (
              <div>
                <form onSubmit={onSubmit} method="POST">
                  <h4>{pencil} Pencil</h4>

                  <textarea
                    className="w-100"
                    maxLength={30}
                    onChange={(e) => onTextChange(e)}
                    required
                  />
                  <p>Text Count: {30 - text.length}</p>
                  <h3>Pick a color: </h3>
                  <div className="d-flex justify-content-evenly mb-3">
                    <button
                      onClick={() => setText({ ...text, pencilColor: "Red" })}
                      className="btn btn-danger w-25"
                    >
                      Red
                    </button>{" "}
                    <button
                      onClick={() => setText({ ...text, pencilColor: "Blue" })}
                      className="btn btn-primary w-25"
                    >
                      Blue
                    </button>{" "}
                    <button
                      onClick={() => setText({ ...text, pencilColor: "Green" })}
                      className="btn btn-success w-25"
                    >
                      Green
                    </button>
                  </div>
                  <p>Text Color: {text.pencilColor}</p>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="card my-5 w-50 p-3">
          <div>
            {texts.data &&
              texts.data.map((text) => (
                <div class="card p-3">
                  <div class="card-body">
                    <p className="fw-bold">
                      ID: {text._id} <br />
                    </p>
                    <p>
                      <b>Length:</b> {text.length}
                    </p>
                    <p>
                      <b>Pencil Type:</b> {text.pencilType}
                    </p>
                    <p style={{ color: `${text.pencilColor}` }}>
                      <b>Pencil Color:</b> {text.pencilColor}
                    </p>
                    <label className="my-3 fw-bold"> Text: </label> <br />
                    <textarea
                      className="w-100"
                      maxLength={text.pencilType === "Graphite" ? 50 : 30}
                      onChange={(e) => onUpdateTextChange(e)}
                    >
                      {text.text}
                    </textarea>{" "}
                    <p>
                      <b> Characters Left: </b>
                      {text.pencilType === "Graphite"
                        ? 50 - text.length
                        : 30 - text.length}
                    </p>
                    <br />
                    <div className="d-flex justify-content-end my-3">
                      <button
                        className="btn btn-success mx-3"
                        onClick={() => updateText(text)}
                      >
                        {" "}
                        Update
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteText(text._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <button className="btn btn-primary" onClick={() => handleGetTexts()}>
            Render Texts
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
