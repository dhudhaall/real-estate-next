import React, { useEffect, useState } from "react";
import classes from "./map-section.card.module.css";
import bg from "../../../public/assets/component-assets/map-card-assets/map-card-bg.png";
// import developer_logo from "../../../public/assets/component-assets/map-card-assets/developer-logo.svg";
import Image from "next/image";
// import hot_tag from "../../../public/assets/tags/hot-ribbon.svg";
import whatsapp_blue from "../../../public/assets/icons/whatsapp_blue.svg";
import Link from "next/link";

import video_card from "../../../public/assets/icons/video_card.svg";
import camera_card from "../../../public/assets/icons/camera_card.svg";
// import share_card from "../../../public/assets/icons/share_card.svg";
import heart_card from "../../../public/assets/icons/heart_card.svg";
import { convertNumberToWords, getDateWithMonthName } from "../../../utils";
import { useAuth } from "../../../contextApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersById, getUsersLikedProperties, updateLikedSearch } from "../../../redux/users";
import { HeartFilled } from '@ant-design/icons'


function MapSectionCard({p, refetchQuery, onLikeTap}) {
  const {user} = useAuth()
  const {userData} = useSelector((state) => state.users)
  const [showHeartIcon , setShowHeartIcon] = useState(true)
  const [isLiked , setIsLiked] = useState(false)
  const dispatch = useDispatch()
  const userObj = userData?.user || userData || {}

  const handleChecks = () => {
    if(user?.id && p?.property?.user){
      if(p?.property?.user?._id === user?.id){
        setShowHeartIcon(false)
      }else if (p?.property?.user === user?.id){
        setShowHeartIcon(false)
      }else {
        setShowHeartIcon(true)
      }
    }else {
      setShowHeartIcon(false) 
    }
    if(userObj?.likedProperties?.includes(p?.property?._id)){
      setIsLiked(true)
    }else{
      setIsLiked(false)
    }
  }

  useEffect(() => {
    handleChecks()
  },[userObj, user, p])

  const handleLikeTap = (e) => {
    e.preventDefault();  // Stop default behavior if any
    e.stopPropagation(); // Stop event propagation
    if(user?.id){
      if(onLikeTap){
        dispatch(updateLikedSearch({
          userId: user.id,
          accessToken: user?.accessToken,
          payload: {
            likedProperties: p?.property?._id
          },
          refetchQuery
        })).then(onLikeTap().then(handleChecks()))
      }else{
        dispatch(updateLikedSearch({
          userId: user.id,
          accessToken: user?.accessToken,
          payload: {
            likedProperties: p?.property?._id
          },
          refetchQuery
        })).then(handleChecks())
      }
    }

  }
  return (
    <Link href={`/property-detail/${p?.property?._id}`}>
      <div className={classes.card_body} id={p?.property._id}>
        {/* <img src={hot_tag.src} className={classes.tag} /> */}
        <div className={classes.card_img}>
        {showHeartIcon && (
          <div onClick={handleLikeTap} className={classes.heart_cont}>
            <img src={heart_card.src} className={classes.heart} alt="Heart"/>
            {isLiked && (
              <HeartFilled className={classes.heart_filled} />
            )}
          </div>
        )}
          {/* <img src={heart_card.src} className={classes.heart} /> */}
          {/* <img src={share_card.src} className={classes.share} /> */}
          <div className={classes.icons_container}>
            <div className={classes.single_tab}>
              <img src={video_card.src} className={classes.video} alt="Total videos"/>
              <p>{p?.property?.videos?.length}</p>
            </div>
            <div className={classes.single_tab}>
              <img src={camera_card.src} className={classes.camera} alt="Total Images" />
              <p>{p?.property?.images?.length}</p>
            </div>
          </div>
          {p?.property?.images?.[0] ? (
              <img
                className={classes.img}
                fill="true"
                src={p?.property?.images?.[0]}
                alt="Map Promo"
              />
            ) : (
              <Image className={classes.img} fill="true" src={bg} alt="Map Placholder" />
            )}
        </div>
        <div className={classes.content_container}>
          {/* <img src={developer_logo.src} className={classes.developer_logo} /> */}
          <div className={classes.content_section}>
            <h2 className={`${classes.property_title} text-one-line`}>
              {p?.property?.title
                  ? p?.property?.title
                  : "Prperty"}
            </h2>
            <h2 className={classes.price}>
            {p?.priceUnit || "PKR"} {convertNumberToWords(p?.price) || "75"}
            </h2>
            <p className={`${classes.address} text-one-line`}>{p?.address}</p>
            <p className={classes.description_text}>Description</p>
            <div className={classes.details_row}>
              <p>{p?.noOfBedrooms ? p?.noOfBedrooms : 0} Bed</p>
              <p>{p?.noOfBathrooms ? p?.noOfBathrooms : 0} Bath</p>
              <p className="text-one-line">
                {p?.property?.areaSize || "500"}{" "}
                {p?.property?.areaSizeUnit || "Sq. Yd"}
              </p>
            </div>
            <p className={classes.status_text}>
              {" "}
              On 4Devari: {getDateWithMonthName(p?.property?.createdAt)}
            </p>

            <div className={classes.btns_container}>
              <div className={classes.non_primary_btns}>
                <div
                  style={{ width: "100%", height: "23px" }}
                  className="btn_secondary"
                >
                  <p style={{ fontSize: "10px" }}>Call</p>
                </div>
                <div
                  style={{ width: "100%", height: "23px" }}
                  className="btn_secondary"
                >
                  <p style={{ fontSize: "10px" }}>WhatsApp</p>
                  <img src={whatsapp_blue.src} alt="Whatsapp"/>
                </div>

                <div style={{ width: "100%", height: "23px" }} className="btn">
                  <p style={{ fontSize: "10px" }}>Email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MapSectionCard;
