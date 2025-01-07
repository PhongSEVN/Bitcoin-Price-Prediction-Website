import React, { useState } from "react";
// import * as tf from "@tensorflow/tfjs"; // Thư viện TensorFlow.js

function App() {
  const [inputData, setInputData] = useState({
    feature1: "",
    feature2: "",
    feature3: "",
    feature4: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [model, setModel] = useState(null);

  // Tải mô hình TensorFlow.js khi ứng dụng khởi động
  React.useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await tf.loadLayersModel("model/model.json"); // Đường dẫn đến mô hình TensorFlow.js
      setModel(loadedModel);
      console.log("Mô hình đã được tải!");
    };

    loadModel();
  }, []);

  // Xử lý khi người dùng nhập dữ liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  // Xử lý khi nhấn nút dự đoán
  const handlePredict = async () => {
    if (!model) {
      alert("Mô hình chưa sẵn sàng!");
      return;
    }

    // Chuyển đổi inputData thành Tensor
    const inputArray = [
      parseFloat(inputData.feature1),
      parseFloat(inputData.feature2),
      parseFloat(inputData.feature3),
      parseFloat(inputData.feature4),
    ];
    const inputTensor = tf.tensor2d([inputArray], [1, 4]); // Thay 4 bằng số lượng đặc trưng của mô hình

    // Dự đoán và hiển thị kết quả
    const predictionTensor = model.predict(inputTensor);
    const predictionValue = predictionTensor.dataSync()[0]; // Lấy kết quả đầu tiên
    setPrediction(predictionValue);
  };

  return (
    <div className="App">
      <h1>Dự đoán giá trị</h1>
      <div>
        <label>
          Feature 1:
          <input
            type="number"
            name="feature1"
            value={inputData.feature1}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Feature 2:
          <input
            type="number"
            name="feature2"
            value={inputData.feature2}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Feature 3:
          <input
            type="number"
            name="feature3"
            value={inputData.feature3}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Feature 4:
          <input
            type="number"
            name="feature4"
            value={inputData.feature4}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={handlePredict}>Dự đoán</button>
      </div>
      {prediction !== null && <h2>Kết quả dự đoán: {prediction}</h2>}
    </div>
  );
}

export default App;
