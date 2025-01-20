import React, { useState } from "react";

const SwitchDatabase = () => {
  const [switchDbName, setSwitchDbName] = useState("");
  const token = sessionStorage.getItem("jwtToken");

  const handleSwitchDatabase = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/switch?dbName=${switchDbName}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // Đính kèm token vào header
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.text(); // Nhận phản hồi từ API
      alert(result); // Hiển thị kết quả switch database
    } catch (error) {
      console.error("Error during switch database:", error);
    }
  };

  return (
    <div>
      <h1>Switch Database</h1>
      <div>
        <label>
          Switch to Database:
          <input
            type="text"
            value={switchDbName}
            onChange={(e) => setSwitchDbName(e.target.value)} // Nhập tên database cần switch
          />
        </label>
      </div>
      <button onClick={handleSwitchDatabase}>Switch Database</button>
    </div>
  );
};

export default SwitchDatabase;
