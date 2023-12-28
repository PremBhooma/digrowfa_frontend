import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./InputF.css";

const InputForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    faq: [{ question: "", answers: [""] }],
  });

  const handleChange = (e, questionIndex, answerIndex) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData };

    if (name === "question") {
      updatedForm.faq[questionIndex].question = value;
    } else if (name === "answers") {
      updatedForm.faq[questionIndex].answers[answerIndex] = value;
    } else {
      updatedForm[name] = value;
    }

    setFormData(updatedForm);
  };

  const handleAddFAQ = () => {
    setFormData((prevData) => ({
      ...prevData,
      faq: [...prevData.faq, { question: "", answers: [""] }],
    }));
  };

  const handleAddAnswer = (questionIndex) => {
    setFormData((prevData) => {
      const updatedForm = { ...prevData };
      updatedForm.faq[questionIndex].answers.push("");
      return updatedForm;
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(
        "https://digrowfa-backend.onrender.com/formData/create",
        formData
      );
      console.log("Form submitted successfully!");
      navigate(`/tableform`);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <section className="formBlock">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              onChange={(e) => handleChange(e)}
              className="form-control"
              rows={3}
              defaultValue={""}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">FAQs</label>

            <div className="mb-3">
              {formData.faq.map((faqItem, questionIndex) => (
                <div key={questionIndex}>
                  <label className="form-label">Question</label>
                  <input
                    type="text"
                    name="question"
                    value={faqItem.question}
                    onChange={(e) => handleChange(e, questionIndex)}
                    className="form-control"
                  />
                  <label>Answers</label>
                  {faqItem.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="mb-3">
                      <input
                        type="text"
                        name="answers"
                        value={answer}
                        onChange={(e) =>
                          handleChange(e, questionIndex, answerIndex)
                        }
                        className="form-control"
                      />
                      {answerIndex === faqItem.answers.length - 1 && (
                        <button
                          type="button"
                          onClick={() => handleAddAnswer(questionIndex)}
                          className="mt-3 btnAns"
                        >
                          Add Answer
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <div className="btnFaq">
                <button type="button" onClick={handleAddFAQ}>
                  Add FAQ
                </button>
              </div>
            </div>
          </div>

          <button className="bthSub" type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </section>
    </>
  );
};

export default InputForm;
