"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Footer from "../../../../comps/footer";
import Link from "next/link";
import { useItemsCartContext } from "../../../../hooks/useItemsCartContext";

const Home = ({ params }) => {
  // Cart Context fetch items
  const { items, dispatch } = useItemsCartContext();

  console.log(items);

  // Add to Cart and dealing with duplicate function
  const [addItemToCart, setaddItemToCart] = useState(); // for adding items to the cart
  const [changeValue, setChangeValue] = useState(0); // for adding items to the cart

  console.log(changeValue);

  useEffect(() => {
    if (addItemToCart !== undefined) {
      const localStoragecurrentItems = JSON.parse(
        localStorage.getItem("cartItems")
      );

      const checkforduplicatefilter = localStoragecurrentItems.filter(
        (item) => {
          //    console.log(item._id, addItemToCart._id);
          return item._id === addItemToCart._id;
        }
      );

      if (checkforduplicatefilter.length >= 1) {
        setTimeout(() => {
          // setDuplicateItemDealWith(checkforduplicatefilter);
          //  console.log("we are dealing with duplicate");
          //dealing with the duplicate
          // const ItemIncresedNumberofItems = checkforduplicatefilter.map(
          //   (item) => {
          //     item.numberofitem += 1;
          //     return item;
          //   }
          // );

          const ItemIncresedNumberofItems = checkforduplicatefilter.map(
            (item) => {
              item.numberofitem += 1;
              return item;
            }
          );
          // ItemIncresedNumberofItems

          // filtering the duplicated in the local storage and just keeping one

          const filteringanyextra = localStoragecurrentItems.filter((item) => {
            //    console.log(item._id, addItemToCart._id);
            return item._id !== addItemToCart._id;
          });
          //    console.log(filteringanyextra);

          dispatch({ type: "ADD", payload: ItemIncresedNumberofItems[0] });

          const mergedArray = [
            ...filteringanyextra,
            ItemIncresedNumberofItems[0],
          ];

          localStorage.setItem("cartItems", JSON.stringify(mergedArray));
        }, 500);
      } else {
        dispatch({ type: "ADD", payload: addItemToCart });

        const mergedArray = [...localStoragecurrentItems, addItemToCart];

        localStorage.setItem("cartItems", JSON.stringify(mergedArray));
      }

      // if (checkforduplicatefilter) {
      //   setDuplicateItemDealWith(checkforduplicatefilter);
      // }
      // console.log(addItemToCart);
      // console.log("we are inside");

      // so we here getting the data from the local storage if they are there, and adding them with the current context so it says
      // up to date.
      // const ToLocalStorageitems = JSON.parse(
      //   localStorage.getItem("cartItems")
      // );
    }
  }, [addItemToCart, changeValue]);

  // Fetching item
  const [itemsFetched, setItemFetched] = useState([]);
  const [allItems, setAllItem] = useState([]);
  const { id } = params;

  console.log(itemsFetched);

  let allItemsAltered = allItems.slice(6, 9);

  // console.log(allItemsAltered);

  // console.log(items);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("http://localhost:4000/api/items/" + id);

      const item = await response.json();
      // console.log("there");

      if (response.ok) {
        // dispatcho({ type: "FETCHED-ALL", payload: json });
        // console.log("there");
      }

      // console.log(item);

      setItemFetched(item);
    };

    const fetchAllItems = async () => {
      const response = await fetch("http://localhost:4000/api/items");

      const items = await response.json();
      // console.log("there");

      if (response.ok) {
        // dispatcho({ type: "FETCHED-ALL", payload: json });
        // console.log("there");
      }

      // console.log(item);

      setAllItem(items);
    };

    fetchItems();
    fetchAllItems();
  }, []);

  // console.log(allItems);

  // useEffect to control pending status or not pending, can be it more complicated and encrypted
  // so the stripe request won't happen won't that encrypted state is present otherwise the code won't follow
  // so it can be used like a webhook to check
  useEffect(() => {
    // pending state to check if the user is clicking on stripe and paying or joking the system
    let pendingstate = false;
    localStorage.setItem("pendingstatev", JSON.stringify(pendingstate));
  }, []);

  return (
    <div className={styles.Page}>
      {Object.keys(itemsFetched).length > 0 && (
        <div key={itemsFetched._id} className={styles.Product}>
          <Image
            // className={styles.ProductImage}
            alt="n"
            // src={require(`./../../../../public/Items/${itemsFetched.name}.png`)}
            src={`https://yehia-bucket-v1.s3.eu-north-1.amazonaws.com/items/${
              itemsFetched.name
            }.png?${Date.now()}`}
            width={400}
            height={400}
            // className="iconImage"
          ></Image>
          <div className={styles.ProductRightside}>
            <div>
              <h2> {itemsFetched.name}</h2>
              <div className={styles.ProductRightsidedescription}>
                A lovely warming {itemsFetched.name} with cinnamon flavours.
              </div>
            </div>
            <div className={styles.ProductRightsideThird}>
              <div>
                <Image
                  alt="n"
                  src={require(`./../../../../public/search/Icons/2.png`)}
                ></Image>
                <div>Origin: Egypt</div>
              </div>
              <div>
                <Image
                  alt="n"
                  src={require(`./../../../../public/search/Icons/3.png`)}
                ></Image>
                <div>Organic</div>
              </div>
              <div>
                <Image
                  alt="n"
                  src={require(`./../../../../public/search/Icons/4.png`)}
                ></Image>
                <div>Vegan</div>
              </div>
            </div>

            <div className={styles.ProductRightsidePrice}>
              {" "}
              ${itemsFetched.price}{" "}
            </div>
            <div className={styles.ProductRightsideVariants}> Variants</div>
            <Image
              // className={styles.ProductImage}
              className={styles.ProductRightsideVariantsImage}
              alt="n"
              src={require(`./../../../../public/Variants/1.png`)}
              // className="iconImage"
            ></Image>
            <div className={styles.ProductRightsideFifth}>
              <div>
                <button
                  className={styles.ProductRightsideFifthButton}
                  onClick={() => {
                    // const numberofitemforvalue = JSON.parse(
                    //   localStorage.getItem("cartItems")
                    // );

                    const numberofitemforvalue = JSON.parse(
                      localStorage.getItem("cartItems")
                    );

                    setaddItemToCart(itemsFetched);
                    setChangeValue(changeValue + 1);

                    // dispatch({ type: "ADD", payload: itemsFetched });
                  }}
                >
                  <Image
                    className="search-icon"
                    src={require(`./../../../../public/Images/shopping-cart.svg`)}
                    // className="iconImage"
                  ></Image>
                  <div>ADD TO BAG</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.ProductAbout}>
        <div>
          <h2>About this tea</h2>
          <div className={styles.ProductAboutFirst}>
            <div>
              <div>FLAVOR</div>
              <div>{itemsFetched.FLAVOR}</div>
            </div>
            <div>
              <div>QUALITIES</div>
              <div>{itemsFetched.QUALITIES}</div>
            </div>
            <div>
              <div>CAFFEINE</div>
              <div>{itemsFetched.CAFFEINE}</div>
            </div>
            <div>
              <div>ALLERGENS</div>
              <div>None</div>
            </div>
          </div>
        </div>
        <div className={styles.ProductAboutSecond}>
          <h2>Ingredient</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do
            eiusmod tempor
          </p>
        </div>
      </div>

      <div className={styles.otherProduct}>
        <h1 className="">You may also like</h1>

        <div className={styles.ProductEachItem}>
          {allItemsAltered.map((item) => {
            return (
              <div key={item._id}>
                <Link
                  href={"/collections/" + item._id}
                  className={styles.productEachItemFlex}
                >
                  <Image
                    alt="n"
                    className={styles.productItemImage}
                    // src={require(`./../../../../public/Items/${item.name}.png`)}
                    src={`https://yehia-bucket-v1.s3.eu-north-1.amazonaws.com/items/${
                      item.name
                    }.png?${Date.now()}`}
                    width={400}
                    height={400}
                    // className="iconImage"
                  ></Image>
                  <div className={styles.productItemName}> {item.name}</div>
                  <div className={styles.productItemPriceAndGram}>
                    <div className={styles.productItemPrice}>${item.price}</div>
                    <div>/50 gram</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;