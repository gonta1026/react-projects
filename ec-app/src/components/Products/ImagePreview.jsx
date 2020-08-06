import React from "react";
import { useDispatch } from "react-redux";

const ImagePreview = (props) => {
    return (
        <div className="p-media__thumb">
            <p onClick={e => props.deleteImage(props.id)}>削除</p>
            <img src={props.path} alt="プレビュー画像" />
        </div>
    );
}

export default ImagePreview;