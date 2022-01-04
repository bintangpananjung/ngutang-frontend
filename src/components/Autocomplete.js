import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AutoFormStyle = styled.div`
  .recom {
    width: 39.5rem;
    left: 5rem;
    transform: translateY(2.5rem);
  }
`;

const Autocomplete = ({ suggestions, props }) => {
  const [recom, setrecom] = useState([]);
  const [valinput, setvalinput] = useState("");
  const [show, setshow] = useState(false);

  useEffect(() => {
    props(valinput);
  }, [valinput]);
  const filterUser = value => {
    setvalinput(value);
    if (value.length > 0) {
      const matches = suggestions.filter(user => {
        const regex = new RegExp(`${value}`);
        return user.match(regex);
      });
      setrecom(matches);
      setshow(true);
    } else {
      setrecom([]);
    }
  };
  return (
    <>
      <input
        type="text"
        className="form-1"
        onChange={e => {
          filterUser(e.target.value);
        }}
        placeholder="Cari User"
        value={valinput}
      />
      <AutoFormStyle>
        <ul className="list-group position-absolute recom">
          {show &&
            (recom.length == 0 && valinput.length > 0 ? (
              <li className="list-group-item alert">user tidak tersedia</li>
            ) : (
              recom
                .filter((item, idx) => idx < 5)
                .map((val, index) => {
                  return (
                    <li className="list-group-item p-0" key={index}>
                      <button
                        className="dropdown-item"
                        onClick={e => {
                          e.preventDefault();
                          setvalinput(val);
                          setshow(false);
                        }}
                      >
                        {val}
                      </button>
                    </li>
                  );
                })
            ))}
        </ul>
      </AutoFormStyle>
    </>
  );
};

export default Autocomplete;
