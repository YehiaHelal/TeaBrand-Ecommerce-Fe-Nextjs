import Link from "next/link";
import Image from "next/image";
import { useItemsCartContext } from "../hooks/useItemsCartContext";
import styles from "./order.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const OrderItems = () => {
  // importing Cart Context items if needed
  const { items, dispatch } = useItemsCartContext();

  // checking if there is items in the carts in the local storage
  const [localStorageItemsCheck, setlocalStorageItemsCheck] = useState(false);

  // setting the purchase button so if there is an item it always update the state and redirect to order page
  let checkLocalStorage;
  useEffect(() => {
    checkLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

    console.log("redirect won't happens");

    if (Object.keys(JSON.parse(localStorage.getItem("cartItems")).length > 0)) {
      console.log("here");
      // setlocalStorageItemsCheck(true);
      console.log("redirect will happen");
    }

    console.log(JSON.parse(localStorage.getItem("cartItems")).length > 0);
  }, []);

  let filterstepone;
  let filtersteptwo;
  let getLocalCartItems;

  getLocalCartItems = JSON.parse(localStorage.getItem("cartItems"));

  // calculating the total value

  // putting the total value of
  const [totalValue, setTotalValue] = useState();

  useEffect(() => {
    let orderTotalvalueArray = getLocalCartItems.map(
      (item) => item.price * item.numberofitem
    );
    let orderTotalvalue = orderTotalvalueArray.reduce((a, b) => a + b, 0);

    setTotalValue(orderTotalvalue);
  }, [items]);

  // for exporting the value to order page and managing stripe
  useEffect(() => {
    localStorage.setItem("itemsvalue", JSON.stringify(totalValue));
  }, [totalValue]);

  // increasing number of items + and decreasing - number of items
  let itemQuantityOneChecking;
  let addingFilterstepone;
  let addingFiltersteptwo;
  let newFilteredTargetItem;
  let filteredTargetItem;

  return (
    <div className={styles.component}>
      <div className={styles.Title}>
        <div>My Bag</div>
      </div>

      <div className={styles.overflow}>
        {getLocalCartItems.map((item) => {
          return (
            <div key={item._id} className={styles.ItemStylesComponent}>
              <Link href={"/collections/" + item._id}>
                <Image
                  alt="n"
                  // src={require(`./../../frontend/public/Items/${item.name}.png`)}
                  src={`https://yehia-bucket-v1.s3.eu-north-1.amazonaws.com/items/${item.name}.png`}
                  width={300}
                  height={300}
                  // className="iconImage"
                ></Image>
              </Link>

              <div className={styles.ItemStylesComponentNameandButton}>
                <div> {item.name} /50 gram</div>
                <button
                  key={item}
                  onClick={() => {
                    filterstepone = JSON.parse(
                      localStorage.getItem("cartItems")
                    );
                    filtersteptwo = filterstepone.filter(
                      (newCart) => newCart._id !== item._id
                    );
                    localStorage.setItem(
                      "cartItems",
                      JSON.stringify(filtersteptwo)
                    );
                    // setMyCategorya([...filtersteptwo]);

                    dispatch({ type: "SET_ITEM", payload: filtersteptwo });
                    // console.log(items);
                  }}
                >
                  Remove
                </button>
              </div>

              <div className={styles.ItemStylesComponentPriceandQuantity}>
                <div className={styles.ItemStylesComponentQuantity}>
                  <button
                    onClick={() => {
                      addingFilterstepone = JSON.parse(
                        localStorage.getItem("cartItems")
                      );
                      addingFiltersteptwo = addingFilterstepone.filter(
                        (newCart) => newCart._id !== item._id
                      );

                      filteredTargetItem = addingFilterstepone.filter(
                        (newCart) => newCart._id === item._id
                      );

                      newFilteredTargetItem = filteredTargetItem.map((item) => {
                        item.numberofitem = item.numberofitem - 1;
                        return item;
                      });

                      [itemQuantityOneChecking] = [...newFilteredTargetItem];

                      //    console.log(itemQuantityOneChecking.numberofitem);

                      if (itemQuantityOneChecking.numberofitem >= 1) {
                        const mergedArray2 = [
                          ...addingFiltersteptwo,
                          ...newFilteredTargetItem,
                        ];
                        //         console.log(mergedArray2);

                        localStorage.setItem(
                          "cartItems",
                          JSON.stringify(mergedArray2)
                        );

                        dispatch({
                          type: "SET_ITEM",
                          payload: mergedArray2,
                        });
                      }

                      if (itemQuantityOneChecking.numberofitem < 1) {
                        //     console.log("we can't subtract more");

                        filterstepone = JSON.parse(
                          localStorage.getItem("cartItems")
                        );

                        //     console.log(filterstepone);
                        filtersteptwo = filterstepone.filter(
                          (newCart) => newCart._id !== item._id
                        );
                        localStorage.setItem(
                          "cartItems",
                          JSON.stringify(filtersteptwo)
                        );
                        // setMyCategorya([...filtersteptwo]);

                        dispatch({
                          type: "SET_ITEM",
                          payload: filtersteptwo,
                        });
                        // console.log(items);
                      }
                      // localStorage.setItem(
                      //   "cartItems",
                      //   JSON.stringify(filtersteptwo)
                      // );
                      // setMyCategorya([...filtersteptwo]);

                      // console.log(items);
                      //   localStorage.setItem(
                      //     "cartItems",
                      //     JSON.stringify(addingFiltersteptwo)
                      //   );
                      //   // setMyCategorya([...filtersteptwo]);

                      //   dispatch({ type: "SET_ITEM", payload: addingFiltersteptwo });
                      //   // console.log(items);
                    }}
                  >
                    -
                  </button>
                  <div>{item.numberofitem}</div>
                  <button
                    onClick={() => {
                      addingFilterstepone = JSON.parse(
                        localStorage.getItem("cartItems")
                      );
                      addingFiltersteptwo = addingFilterstepone.filter(
                        (newCart) => newCart._id !== item._id
                      );

                      filteredTargetItem = addingFilterstepone.filter(
                        (newCart) => newCart._id === item._id
                      );

                      newFilteredTargetItem = filteredTargetItem.map((item) => {
                        item.numberofitem = item.numberofitem + 1;
                        return item;
                      });

                      // localStorage.setItem(
                      //   "cartItems",
                      //   JSON.stringify(filtersteptwo)
                      // );
                      // setMyCategorya([...filtersteptwo]);

                      const mergedArray2 = [
                        ...addingFiltersteptwo,
                        ...newFilteredTargetItem,
                      ];
                      //    console.log(mergedArray2);

                      localStorage.setItem(
                        "cartItems",
                        JSON.stringify(mergedArray2)
                      );

                      dispatch({ type: "SET_ITEM", payload: mergedArray2 });
                      // console.log(items);
                      //   localStorage.setItem(
                      //     "cartItems",
                      //     JSON.stringify(addingFiltersteptwo)
                      //   );
                      //   // setMyCategorya([...filtersteptwo]);

                      //   dispatch({ type: "SET_ITEM", payload: addingFiltersteptwo });
                      //   // console.log(items);
                    }}

                    //   const numberofitemforvalue = JSON.parse(
                    //     localStorage.getItem("cartItems")
                    //   );

                    //   setaddItemToCart(item);
                    //   setChangeValue(numberofitemforvalue.length + 1);
                    // }}
                  >
                    +
                  </button>
                </div>
                <div className={styles.ItemStylesComponentPrice}>
                  ${item.price}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.TotalPriceComponent}>
        <div>Total Price</div>
        <div>${totalValue}</div>
      </div>

      {/* redirect to order page if clicked and there is items inside cart */}
      {/* {JSON.parse(localStorage.getItem("cartItems")).length > 0 && (
        <div className={styles.ButtonElements}>
          <div className={styles.TotalPrice}>
            <div>Total</div>
            <div>${totalValue}</div>
          </div>

          <Link className={styles.PurchaseButtonLink} href={"/order"}>
            Purchase
          </Link>
        </div>
      )} */}

      {/* error if clicked and there is no item inside cart */}
      {/* {JSON.parse(localStorage.getItem("cartItems")).length === 0 && (
        <div className={styles.ButtonElements}>
          <div className={styles.TotalPrice}>
            <div>Total</div>
            <div>${totalValue}</div>
          </div>

          <button className={styles.PurchaseButton}>Purchase</button>
        </div>
      )} */}
    </div>
  );
};

export default OrderItems;

export const CartItemAlertNumberOfitemsOrder = () => {
  // to reload the page if any changes made to the items context
  const { items, dispatch } = useItemsCartContext();

  // Cart alert and number of item if there is one added
  const [CartAlertNumofitems, setCartAlertNumofitems] = useState(0);

  let CartAlertNumofitemsOutside = JSON.parse(
    localStorage.getItem("cartItems")
  );

  useEffect(() => {
    setCartAlertNumofitems(CartAlertNumofitemsOutside.length);
  }, [items]);

  return (
    <div>
      {CartAlertNumofitems > 0 && (
        <div className={styles.cartitemnumber}>{CartAlertNumofitems}</div>
      )}
    </div>
  );
};