import React, {useState, useCallback, useEffect} from "react";
import {SelectBox,TextInput,PrimaryButton} from "../components/UIkit";
import {ImageArea} from "../components/Products";
import {useDispatch} from "react-redux";
import {saveProduct} from "../reducks/products/operations";
import {db} from "../firebase/index";
const ProductEdit = (props) => {
  const dispatch = useDispatch();
  console.log(props.match);
  let id = window.location.pathname.split('/product/edit')[1];
  if (id !== "") {
    id = id.split('/')[1]
  }
  console.log(id);
  
  const [name, setName] = useState(""),
        [description, setDescription] = useState(""),
        [category, setCategory] = useState(""),
        [price, setPrice] = useState(""),
        [images, setImages] = useState([]),
        [gender, setGender] = useState(""); 


  const inputName = useCallback((e) => {
    setName(e.target.value)
  }, [setName]);
          
  const inputDescription = useCallback((e) => {
    setDescription(e.target.value)
  }, [setDescription]);
          
  const inputPrice = useCallback((e) => {
    setPrice(e.target.value)
  }, [setPrice]);
          
  const categories = [
    {id: "tops", name: "トップス"},
    {id: "pants", name: "パンツ"},
    {id: "shirts", name: "シャツ"},
  ];
  
  const genders = [
    {id: "all", name: "全て"},
    {id: "men", name: "男性"},
    {id: "female", name: "女性"},
  ];

  useEffect(() => {
    if (id !== ""){
        db.collection("products").doc(id).get()
            .then(snapshot => {
                const data = snapshot.data();
                setImages(data.images);
                setName(data.name);
                setDescription(data.description);
                setCategory(data.category);
                setGender(data.gender);
                setPrice(data.price);
            })
    }
  }, [id])
  console.log(name)

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">

        <ImageArea setImages={setImages} images={images}/>
        <TextInput
          fullWidth={true} label={"商品名"} multiline={false} required={true}
          rows={1} type={"name"} onChange={inputName} value={name}
        />
        
        <TextInput
          fullWidth={true} label={"商品説明"} multiline={true} required={true}
          rows={5} type={"description"} onChange={inputDescription} value={description}
        />
        
        <SelectBox
          label={"カテゴリー"} options={categories} required={true} select={setCategory} value={category}
         />

        <SelectBox
          label={"性別"} options={genders} required={true} select={setGender} value={gender}
         />

        <TextInput
          fullWidth={true} label={"価格"} multiline={true} required={true}
          rows={1} type={"number"} onChange={inputPrice} value={price}
        />

      <div className="module-spacer--medium" />
      <div className="center">
        <PrimaryButton label={"商品情報を登録"} onClick={() => dispatch(saveProduct(name, description, category, price, gender, images))}/>
      </div>
      </div>
    </section>
  );
}

export default ProductEdit;