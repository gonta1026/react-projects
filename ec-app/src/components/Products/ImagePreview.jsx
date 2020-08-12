import React from "react";
import { useDispatch } from "react-redux";

const ImagePreview = ({ deleteImage, id, path }) => {
    return (
        <div className="p-media__thumb">
            <p onClick={e => deleteImage(id)}>削除</p>
            <img src={path} alt="プレビュー画像" />
        </div>
    );
}

export default ImagePreview;
