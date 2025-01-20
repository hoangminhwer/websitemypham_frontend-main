import React, { useState } from 'react';

const AccountImages = ({ onImageUpload }) => {
    const [file, setFile] = useState(null);

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);

            // Tạo đối tượng FormData và thêm file vào đó
            const formData = new FormData();
            formData.append('file', file);

            // Nếu bạn có một hàm callback để gửi file sau khi upload
            if (onImageUpload) {
                onImageUpload(formData); // Truyền FormData đến callback
            }
        }
    };



    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title mb-0">Avatar</h4>
            </div>
            <div className="card-body">
                <div className="fallback">
                    <input name="file" type="file" onChange={handleFileChange} />
                </div>
                <div className="dz-message needsclick">
                    <div className="mb-3">
                        <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                    </div>
                    <h4>Drop files here or click to upload.</h4>
                </div>

            </div>
        </div>
    );
};

export default AccountImages;
