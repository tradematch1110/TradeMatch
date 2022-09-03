import * as React from "react";

const MainLogo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={"50px"}
    height={"50px"}
    viewBox="0 0 352 360"
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="#032329"
      d="M329.994 191.643c.992 80.285-65.913 147.918-149.406 146.328C103.329 336.5 34.34 273.538 37.112 185.32c1.123-35.754 14.202-67.311 38.649-93.463 32.114-34.354 72.242-49.724 119.079-46.808 69.671 4.338 135.995 64.037 135.154 146.594zM183.704 59.992c-34.739.241-67.787 13.131-93.744 39.726-24.604 25.21-37.433 56.08-37.664 91.101-.211 32.046 10.493 61.093 31.649 85.523 26.216 30.273 59.994 46.168 99.761 46.303 35.274.119 66.609-12.827 91.796-37.91 26.913-26.801 40.62-59.811 39.324-97.842C312.5 118.629 257.07 60.821 183.704 59.992z"
    />
    <circle fill="#032329" cx={182.044} cy={191} r={119.317} />
    <path
      fill="#0EACCB"
      d="M226.012 219.984c2.686 2.012 5.26 4.201 8.084 5.996 4.912 3.122 6.372 8.516 3.45 13.732-3.116 5.563-8.081 7.082-13.694 4.225-3.932-2.001-7.888-3.957-11.833-5.934-.876-.583-1.75-1.17-2.64-1.73-.037-.024-.234.206-.357.318l3.07 1.333c.256.412.415.978.785 1.212 2.899 1.838 5.501 3.941 4.484 7.852-1.252 4.818-2.714 10.081-8.338 11.098-2.556.462-5.599-1.577-8.333-2.696-.203-.083.055-2.042.523-2.897 4.243-7.767.113-16.863-8.85-18.189-3.92-.58-5.523-2.34-7.764-5.374-2.749-3.721-7.259-6.408-11.485-8.637-1.65-.87-5.327-.048-6.801 1.351-3.061 2.906-4.641 1.402-6.925-.688-1.907-1.745-4.133-3.358-6.504-4.337-5.157-2.129-9.148-1.176-12.164 3.457-2.311 3.55-3.922 2.697-5.906.219-3.036-3.792-7.087-5.541-11.747-5.23-2.109.141-5.022 1.084-6.009 2.648-2.423 3.841-5.745 3.788-9.091 2.927a1004.751 1004.751 0 0 1-34.339-9.499c-1.421-.42-3.248-2.371-3.382-3.759-.686-7.081-1.276-14.217-1.155-21.322.219-12.78 2.685-25.193 7.602-37.057 1.009-2.435 2.345-4.797 2.933-7.332 1.174-5.061 4.434-5.085 8.378-4.036 12.117 3.223 24.272 6.308 36.331 9.734 4.232 1.202 7.769.426 11.37-1.716 9.071-5.395 18.007-11.075 27.417-15.807 3.126-1.572 7.561-.994 11.336-.675 2.818.238 3.339 2.669.803 3.934-11.412 5.688-15.169 15.689-16.576 27.413-.545 4.54-2.116 8.956-3.212 13.431-1.229 5.018.279 9.072 4.927 11.199 3.696 1.691 7.675 3.12 11.67 3.727-.435-1.626 5.973-3.126 11.446-10.876 3.332-4.718 5.007-10.171 6.556-15.732 1.865-6.695 7.847-8.584 13.873-5.054 16.335 9.567 32.793 18.922 49.21 28.347 2.718 1.56 5.571 2.902 8.197 4.6 4.136 2.675 5.015 5.937 3.073 10.506-.769 1.81-1.53 3.642-2.502 5.345-1.954 3.424-5.647 4.172-10.385 2.093-5.225-2.292-10.4-4.702-15.596-7.06-1.154-.949-2.308-1.899-3.48-2.826-.007-.006-.266.306-.408.47 1.157.762 2.31 1.531 3.476 2.278.116.074.314-1.34.474-1.335 4.865 2.976 9.639 7.476 14.626 10.23 3.257 1.799 4.453 4.18 3.343 7.614-.794 2.456-1.596 4.992-2.914 7.179-2.688 4.457-5.842 5.386-10.435 3.127-4.953-2.436-9.758-5.172-14.628-7.778l-4.638-2.469c-.067.227-.207.646-.189.653 1.607.619 3.225 1.207 4.843 1.797z"
    />
    <path
      fill="#0EACCB"
      d="M298.178 189.279c-.477 6.694-.727 12.167-1.316 17.603-.265 2.447-1.063 4.427-4.294 5.204-10.097 2.428-20.042 5.484-30.104 8.066-1.568.402-4.938-.357-4.946-.65-.076-2.74-1.841-5.887 1.628-8.062 5.494-3.443 9.039-8.134 8.877-15.033-.076-3.212-1.046-5.385-4.125-7.119-19.774-11.135-39.414-22.506-59.1-33.797-.286-.164-.604-.273-.893-.433-6.785-3.76-11.994-2.486-15.174 4.832-2.329 5.36.06 9.743-4.036 13.997-4.683 4.864-6.965 8.342-13.057 11.864-5.146 2.975-10.914-1.402-12.826-5.833-.912-2.114-.955-4.948-.465-7.259 1.71-8.052 3.528-16.109 5.931-23.973.961-3.144 3.013-6.427 5.508-8.534 5.901-4.985 12.406-9.251 18.589-13.91 4.645-3.5 9.483-3.378 14.285-.746 11.427 6.263 22.838 12.565 34.082 19.148 3.907 2.287 7.427 2.596 11.729 1.295 10.428-3.152 20.981-5.9 31.523-8.663 3.002-.787 5.65-.113 6.726 3.351 3.171 10.21 6.769 20.313 9.364 30.667 1.552 6.187 1.534 12.767 2.094 17.985zM172.023 254.952c-.353.312-.811.554-1.046.945-6.977 11.603-13.545 11.345-20.629 3.754-3.109-3.331.286-9.377 2.224-12.769 1.87-3.273 3.65-6.597 5.47-9.899l-.07.071c2.092-3.129 4.264-6.207 6.257-9.398 3.506-5.615 9.689-6.177 15.047-2.022 5.073 3.934 3.418 8.641 2.691 13.428l.078-.092-4.068 7.086.068-.086-3.09 4.057.067-.077-3.067 5.088.068-.086z"
    />
    <path
      fill="#0EACCB"
      d="M181.966 239.062c5.013-3.412 10.846-3.207 14.823.272 3.878 3.393 4.494 6.539 2.052 11.51-3.34 6.797-4.081 8.262-8.134 14.67-2.042 3.228-6.975 6.144-10.696 3.986-1.002-.581-2.642-1.485-3.511-2.25-4.545-4-5.23-9.068-4.718-11.217.454-.983 0 0 .241-1.081l-.068.085 3.067-5.088-.067.077 3.09-4.057-.068.086 4.068-7.086-.079.093zM131.977 237.014c1.014-1.018 2.268-1.888 2.999-3.079 2.563-4.177 4.74-8.602 7.449-12.677 3.482-5.238 14.424-3.112 17.146 3.512.848 2.064.156 4.85-.144 7.267-.212 1.706-.951 3.347-1.455 5.017l.07-.071c-1.861 2.425-3.929 4.721-5.536 7.305-2.415 3.884-6.705 16.905-12.756 15.212-7.816-2.186-14.25-7.007-7.475-21.623.133-.286-.14-.637-.216-.955l-.082.092z"
    />
    <path
      fill="#0EACCB"
      d="M132.059 236.922c-6.272 5.024-9.817 4.756-16.317-.668-2.744-2.289-3.174-5.097-2.482-8.053 2.308-9.853 9.667-12.684 18.347-7.251 4.138 2.591 5.228 6.607 2.981 10.86-.906 1.716-1.743 3.468-2.612 5.204l.083-.092z"
    />
    <path
      fill="#8DBC57"
      d="M236.006 200.992c-.16-.006-.358.048-.474-.026-1.166-.747-2.319-1.516-3.476-2.278.141-.164.4-.475.408-.47 1.172.927 2.325 1.877 3.48 2.826l.062-.052zM226.012 219.984c-1.617-.59-3.236-1.178-4.842-1.798-.018-.007.123-.426.189-.653l4.638 2.469.015-.018zM212.093 237.923l-3.07-1.333c.123-.112.319-.341.357-.318.89.56 1.764 1.148 2.64 1.73l.073-.079zM182.045 238.969l-4.068 7.086 4.068-7.086zM175.021 249.949l-3.067 5.088 3.067-5.088zM178.045 245.969l-3.09 4.057 3.09-4.057z"
    />
  </svg>
);

export default MainLogo;
