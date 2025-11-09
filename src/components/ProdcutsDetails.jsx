import React, { useContext, useEffect, useRef, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const ProductsDetails = () => {
  //const { _id: productId } = useLoaderData();
  const [bids, setBids] = useState([])
  const bidModalRef = useRef(null);
  const { user } = useContext(AuthContext); 

  const {id} = useParams()

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${id}`)
    .then(res => res.json())
    .then(data => {
        console.log('bids for this product', data)
        setBids(data)
    })
  }, [id])

  const handleBModalOpen = () => {
    bidModalRef.current.showModal();
  };

  const handleBidsSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;

    const newBid = {
      productId: id,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photoURL,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.insertedId) {
            bidModalRef.current.close()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your bid has been placed",
              showConfirmButton: false,
              timer: 1500,
            });
            // add the new bid to the state
            newBid._id = data.insertedId;
            const newBids = [...bids, newBid]
            newBids.sort((a, b) => b.bid_price - a.bid_price)
            setBids(newBids)
        }
      });
  };

  return (
    <div>
      <button onClick={handleBModalOpen} className="btn btn-primary">
        Buy this product
      </button>

      <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Give the best offer!</h3>

          <form onSubmit={handleBidsSubmit}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                readOnly
                defaultValue={user?.displayName || ""}
              />

              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                readOnly
                defaultValue={user?.email || ""}
              />

              <input
                type="text"
                name="bid"
                className="input"
                placeholder="Your bid"
                required
              />
              <button className="btn btn-neutral mt-4">Place your bid</button>
            </fieldset>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <div>
        <h3 className="text-3xl">
          Bids for this product <span>{bids.length}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>sl no.</th>
                <th>Buyer name</th>
                <th>Buyer email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{bid.buyer_email}</td>
                  <td>{bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">
                      {bid.bid_price}
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
