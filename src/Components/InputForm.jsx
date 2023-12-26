import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import "./InputF.css";

const InputForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    faq: [{ question: "", answers: [] }],
  });

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData };

    if (name === "question") {
      updatedForm.faq[index].question = value;
    } else if (name === "answer") {
      updatedForm.faq[index].answers = value.split(",");
    } else {
      updatedForm[name] = value;
    }

    setFormData(updatedForm);
  };

  const handleAddFAQ = () => {
    setFormData((prevData) => ({
      ...prevData,
      faq: [...prevData.faq, { question: "", answers: [] }],
    }));
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
              {formData.faq.map((faqItem, index) => (
                <div key={index}>
                  <label className="form-label">Questions</label>
                  <input
                    type="text"
                    name="question"
                    value={faqItem.question}
                    onChange={(e) => handleChange(e, index)}
                    className="form-control"
                  />
                  <label>Answers</label>
                  <input
                    type="text"
                    name="answer"
                    value={faqItem.answers.join(",")}
                    onChange={(e) => handleChange(e, index)}
                    className="form-control"
                  />
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
