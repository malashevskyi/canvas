

const CodePenLink = ({ link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="codePen-link"
    >
      <svg 
        viewBox="0 0 72 72"
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
      >
        <polygon points="0 72 72 72 72 0 0 0"></polygon>
        <path d="M59.982,28.419 C59.9775,28.3875 59.97,28.359 59.9655,28.329 C59.955,28.2705 59.9445,28.212 59.9295,28.1565 C59.9205,28.122 59.907,28.089 59.8965,28.056 C59.88,28.005 59.8635,27.9555 59.844,27.906 C59.8305,27.8715 59.814,27.837 59.7975,27.8055 C59.7765,27.7575 59.754,27.7125 59.727,27.669 C59.709,27.636 59.688,27.6045 59.6685,27.573 C59.6415,27.5295 59.613,27.4875 59.5815,27.447 C59.559,27.417 59.535,27.387 59.511,27.3585 C59.478,27.3195 59.4435,27.282 59.4075,27.246 C59.3805,27.219 59.355,27.1905 59.3265,27.1665 C59.2875,27.132 59.2485,27.099 59.2095,27.0675 C59.178,27.0435 59.148,27.0195 59.1165,26.997 C59.1045,26.9895 59.094,26.979 59.082,26.9715 L37.1445,12.3465 C36.4515,11.8845 35.55,11.8845 34.8555,12.3465 L12.9195,26.9715 C12.9075,26.979 12.897,26.9895 12.885,26.997 C12.852,27.0195 12.822,27.0435 12.792,27.0675 C12.7515,27.099 12.7125,27.132 12.675,27.1665 C12.6465,27.1905 12.6195,27.219 12.5925,27.246 C12.5565,27.282 12.522,27.3195 12.4905,27.3585 C12.465,27.387 12.441,27.417 12.4185,27.447 C12.3885,27.4875 12.36,27.5295 12.333,27.573 C12.312,27.6045 12.2925,27.636 12.273,27.669 C12.2475,27.7125 12.225,27.7575 12.2025,27.8055 C12.1875,27.837 12.171,27.8715 12.1575,27.906 C12.1365,27.9555 12.12,28.005 12.1035,28.056 C12.093,28.089 12.081,28.122 12.072,28.1565 C12.057,28.212 12.0465,28.2705 12.036,28.329 C12.03,28.359 12.0225,28.3875 12.0195,28.419 C12.0075,28.506 12,28.596 12,28.6875 L12,43.3125 C12,43.4025 12.0075,43.4925 12.0195,43.5825 C12.0225,43.611 12.03,43.641 12.036,43.671 C12.0465,43.7295 12.057,43.7865 12.072,43.8435 C12.081,43.878 12.093,43.911 12.1035,43.944 C12.12,43.9935 12.1365,44.0445 12.1575,44.0955 C12.171,44.1285 12.1875,44.1615 12.2025,44.1945 C12.225,44.241 12.2475,44.286 12.273,44.3325 C12.2925,44.364 12.312,44.3955 12.333,44.427 C12.36,44.4705 12.3885,44.511 12.4185,44.5515 C12.441,44.583 12.465,44.613 12.4905,44.6415 C12.522,44.679 12.5565,44.718 12.5925,44.7525 C12.6195,44.781 12.6465,44.808 12.675,44.8335 C12.7125,44.868 12.7515,44.901 12.792,44.9325 C12.822,44.9565 12.852,44.9805 12.885,45.003 C12.897,45.0105 12.9075,45.021 12.9195,45.0285 L34.8555,59.6535 C35.202,59.8845 35.601,60 36,60 C36.399,60 36.798,59.8845 37.1445,59.6535 L59.082,45.0285 C59.094,45.021 59.1045,45.0105 59.1165,45.003 C59.148,44.9805 59.178,44.9565 59.2095,44.9325 C59.2485,44.901 59.2875,44.868 59.3265,44.8335 C59.355,44.808 59.3805,44.781 59.4075,44.7525 C59.4435,44.718 59.478,44.679 59.511,44.6415 C59.535,44.613 59.559,44.583 59.5815,44.5515 C59.613,44.511 59.6415,44.4705 59.6685,44.427 C59.688,44.3955 59.709,44.364 59.727,44.3325 C59.754,44.286 59.7765,44.241 59.7975,44.1945 C59.814,44.1615 59.8305,44.1285 59.844,44.0955 C59.8635,44.0445 59.88,43.9935 59.8965,43.944 C59.907,43.911 59.9205,43.878 59.9295,43.8435 C59.9445,43.7865 59.955,43.7295 59.9655,43.671 C59.97,43.641 59.9775,43.611 59.982,43.5825 C59.994,43.4925 60,43.4025 60,43.3125 L60,28.6875 C60,28.596 59.994,28.506 59.982,28.419 L59.982,28.419 L59.982,28.419 Z M38.0625,17.9175 L54.2235,28.6905 L47.0055,33.519 L38.0625,27.537 L38.0625,17.9175 L38.0625,17.9175 Z M33.9375,17.9175 L33.9375,27.537 L24.996,33.519 L17.7765,28.6905 L33.9375,17.9175 L33.9375,17.9175 Z M16.125,32.5485 L21.2865,36 L16.125,39.4515 L16.125,32.5485 L16.125,32.5485 Z M33.9375,54.0825 L17.7765,43.3095 L24.996,38.4825 L33.9375,44.463 L33.9375,54.0825 L33.9375,54.0825 Z M36,40.8795 L28.7055,36 L36,31.1205 L43.296,36 L36,40.8795 L36,40.8795 Z M38.0625,54.0825 L38.0625,44.463 L47.0055,38.4825 L54.2235,43.3095 L38.0625,54.0825 L38.0625,54.0825 Z M55.875,39.4515 L50.715,36 L55.875,32.5485 L55.875,39.4515 L55.875,39.4515 Z" fill="#FFFFFF"></path>
      </svg>
    </a>
  );
};

export default CodePenLink;