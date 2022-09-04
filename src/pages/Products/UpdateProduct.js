import React, { useEffect, useRef, useState } from "react";

import Input from "../../components/Ui/Input";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { Col, Container, Form, Row } from "react-bootstrap";
import { selectCurrentToken } from "../../features/auth/authSlice";
import { uploadImages } from "../../function/uploadImages";
import dataURItoBlob from "../../helpers/dataURIToBlob";
import { useSelector } from "react-redux";
import {
  selectAllCategories,
  useGetCategoriesQuery,
} from "../../features/categories/categoriesApiSlice";
import { useDeleteProductMutation, useUpdateProductMutation } from "../../features/products/productsApiSlice";
import { useNavigate } from "react-router-dom";

const UpdateProduct = ({ setShow, show, handleClose, product }) => {
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate()

//=======================RTK========hooks=============================//
  const [updateProduct, { isLoading, isSuccess, isError, error }] =
    useUpdateProductMutation();
 

//=======================RTK========hooks=============================//



  //===========state management============================//

  const availabelcolors = product.colors ? product.colors.join(",") : "";
  const activities = product.activity ? product.activity.join(",") : "";
  const availableSizes = product.availableSizes
    ? product.availableSizes.join(",")
    : "";

  console.log(product.category.name);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [offers, setOffers] = useState(product.offers);
  const [quantity, setQuantity] = useState(product.quantity);
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(product.category._id);
  const [Error, setError] = useState("");
  const [colors, setColors] = useState(availabelcolors);
  const [brand, setBrand] = useState(product.brand);
  const [activity, setActivity] = useState(activities);
  const [sizes, setSizes] = useState(availableSizes);
  const [isFeatured, setIsFeatured] = useState(product.isFeatured);
//====================================state mgt ends here=======================//

  //=================handling formvalue====================================//

  const handleOnChangeColors = (e) => {
    setColors(e.target.value.split(","));
    console.log(colors);
  };
  const onBrandChange = (e) => {
    setBrand(e.target.value);
  };
  const onSizeChange = (e) => {
    setSizes(e.target.value.split(","));
  };

  const onActivityChange = (e) => {
    setActivity(e.target.value.split(","));
  };
//=================================================================//


//===========================handling img files======================//
  const handleImages = (e) => {
    console.log(images);
    let files = Array.from(e.target.files);
    console.log(files);
    files.forEach((img) => {
      console.log(img);
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(
          `${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        console.log("reader");
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setImages((images) => [...images, readerEvent.target.result]);
        };
      }
    });
  };

 //===========================handling img files======================//


  //------------------------create category-----------------------//
  const { data: categories } = useGetCategoriesQuery();

  const categoryLIst = useSelector(selectAllCategories);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  //------------------------create category-----------------------//

  //===============handling update  product submission========//

  const canSave =
    [name, description, price, quantity, images].every(Boolean) && !isLoading;
  const onSumbmitProduct = async () => {
    console.log("submitting");
    if (images && images.length) {
      console.log("first");

      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      });
      const path = `${name}/product-image`;
      let formData = new FormData();
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response = await uploadImages(formData, path, token);

      console.log(response);

      if (canSave) {
        console.log("updating node");
        try {
          await updateProduct({
            id: product._id,
            name,
            description,
            price,
            quantity,
            offers,
            category,
            brand,
            activity,
            images:response,
            colors,
            availableSizes:sizes,
            isFeatured,
          }).unwrap();

          setShow(false);
        } catch (err) {
          console.error("Failed to save the product", err);
        }
      } else {
        setError("invalid upload");
      }
    } else {
      await updateProduct({
        id: product._id,
        name,
        description,
        price,
        quantity,
        offers,
        category,
        brand,
        activity,
        colors,
        availableSizes:sizes,
        isFeatured,
      }).unwrap();

      setShow(false);
    }
  };

 //===========================updation ends===========================// 

 //==================================delete Product====================//





 //==================================delete Product====================//

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add product</Modal.Title>

        {Error && <p>{Error}</p>}
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Input
                className="mt-2"
                value={name}
                placeholder={`product....`}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                className="mt-2"
                value={description}
                placeholder={`Description....`}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Input
                className="mt-2"
                value={price}
                placeholder={`Enter Price`}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Input
                className="mt-2"
                value={offers}
                placeholder={`Enter offers if any`}
                onChange={(e) => setOffers(e.target.value)}
              />
              <Input
                className="mt-2"
                value={colors}
                placeholder={`colors available`}
                onChange={handleOnChangeColors}
              />
              <Input
                className="mt-2"
                value={activity}
                placeholder={`Activity`}
                onChange={onActivityChange}
              />
            </Col>
            <Col>
              <Input
                className="mt-2"
                value={quantity}
                placeholder={`Enter stock`}
                onChange={(e) => setQuantity(e.target.value)}
              />

              <Form.Select
                className="mt-2"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option>----select category----</option>
                {createCategoryList(categoryLIst).map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Group controlId="formFile" className="mt-2">
                <Form.Control
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  onChange={handleImages}
                />
              </Form.Group>
              <Input
                className="mt-2"
                value={sizes}
                placeholder={`Enter sizes available`}
                onChange={onSizeChange}
              />

              <Input
                className="mt-2"
                value={brand}
                placeholder={`Enter brands available`}
                onChange={onBrandChange}
              />
              <Form.Select
                className="mt-2"
                onChange={(e) => setIsFeatured(e.target.value)}
                value={isFeatured}
              >
                <option>featured product ?</option>
                <option value="false" key="123">
                  No
                </option>
                <option value="true" key="126">
                  Yes
                </option>
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          disabled={!canSave}
          variant="primary"
          onClick={onSumbmitProduct}
        >
          {isLoading ? "loading.." : "Save changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateProduct;
