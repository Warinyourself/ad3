import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'AppIcon',
  template: `
    <svg
    v-if="name === 'statistics'"
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox=".5 .5 49 49"
  >
    <path
      fill="none"
      d="M4 25A21 21 0 1 0 29 4"
      stroke-width="7"
      stroke-linecap="round"
      stroke-miterlimit="3"
    />
    <path d="M12 25a13 13 0 1 0 15-13l-2 13H12z" />
  </svg>

  <svg
    v-else-if="name === 'bitcoin'"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M78.8036 49.6767C73.4605 71.1054 51.7532 84.1453 30.3196 78.8029C8.89605 73.4604 -4.1466 51.7555 1.19772 30.3281C6.5383 8.89695 28.2444 -4.14548 49.6717 1.19699C71.104 6.53946 84.1454 28.2469 78.8023 49.6767H78.8036Z"
      fill="#F7931A"
    />
    <path
      d="M57.6388 34.3018C58.4339 28.9794 54.381 26.1181 48.8391 24.2094L50.6368 16.9994L46.2463 15.9057L44.4961 22.9256C43.3435 22.6381 42.1584 22.3669 40.9808 22.0981L42.7434 15.0319L38.3567 13.9382L36.5578 21.1457C35.6027 20.9282 34.6651 20.7132 33.755 20.4869L33.76 20.4644L27.7068 18.9532L26.5392 23.6406C26.5392 23.6406 29.7958 24.3869 29.727 24.4331C31.5047 24.8769 31.8273 26.0531 31.7723 26.9856L29.7245 35.1993C29.8471 35.2306 30.0058 35.2756 30.1808 35.3456L29.7183 35.2306L26.8467 46.7368C26.6292 47.2768 26.0779 48.0868 24.8353 47.7793C24.879 47.843 21.6449 46.983 21.6449 46.983L19.4659 52.008L25.1791 53.4317C26.2417 53.698 27.283 53.9767 28.3069 54.2392L26.4904 61.533L30.8747 62.6267L32.6749 55.4117C33.8712 55.7367 35.0339 56.0367 36.1715 56.3192L34.3788 63.5005L38.768 64.5942L40.5845 57.3155C48.069 58.7317 53.6984 58.1605 56.0649 51.393C57.9738 45.943 55.9711 42.7993 52.0332 40.7481C54.901 40.0843 57.0612 38.1981 57.6376 34.3018H57.6388ZM47.609 48.363C46.2513 53.813 37.0753 50.868 34.0988 50.128L36.509 40.4668C39.4844 41.2093 49.0241 42.6793 47.6102 48.363H47.609ZM48.9654 34.2231C47.7277 39.1806 40.0894 36.6618 37.6104 36.0443L39.7956 27.2819C42.2747 27.8994 50.2555 29.0519 48.9654 34.2231V34.2231Z"
      fill="white"
    />
  </svg>

  <svg
    v-else-if="name === 'nem'"
    width="81"
    height="80"
    viewBox="0 0 81 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40.1011 80C40.2648 79.8909 40.483 79.7818 40.6467 79.6727C45.9389 76.5628 50.8493 72.8527 55.2686 68.5971C55.5414 68.3243 55.7597 67.9969 55.9779 67.6696C56.2507 67.124 56.578 66.5238 56.8508 65.9782C58.9786 61.5589 59.4151 57.0305 57.9966 52.3384C55.2686 43.227 46.4846 37.9893 37.7005 39.135C35.1908 39.4624 32.8447 40.2262 30.6623 41.4811C26.4613 43.8271 21.9874 44.8092 17.2407 44.3727C14.8947 44.1545 12.6577 43.5543 10.4754 42.6268C8.78404 41.863 7.20181 40.9355 5.7287 39.7898C5.61959 39.6806 5.51047 39.6261 5.29224 39.517C5.3468 39.7352 5.40135 39.8443 5.45591 39.9534C7.31093 44.7547 9.657 49.2831 12.4395 53.6478C15.4403 58.3399 18.8775 62.6501 22.7512 66.633C26.6249 70.6158 30.8806 74.1076 35.5181 77.2175C37.5368 78.5269 39.5009 79.7272 40.1011 80Z"
      fill="#05CCBB"
    />
    <path
      d="M62.1432 61.177C62.3614 61.0679 62.4705 60.9042 62.5796 60.7406C64.271 58.6127 65.8532 56.4304 67.3263 54.1934C72.6185 46.0095 76.274 37.1709 78.3473 27.6776C79.0566 24.4586 79.5476 21.185 79.8204 17.9115C80.0386 15.6745 80.1477 13.4376 80.1477 11.2007C80.1477 11.037 80.1478 10.8733 80.0932 10.7642C79.875 10.6551 79.6567 10.4914 79.493 10.3823C77.7471 9.40019 76.0012 8.47268 74.2008 7.65429C71.5819 6.45399 68.9631 5.30824 66.2351 4.48985C62.907 3.3441 59.5789 3.23499 56.1416 4.05338C46.4846 6.39943 40.3194 15.8382 42.1199 25.6043C43.1565 31.0057 46.0481 35.2068 50.6857 38.153C51.013 38.3712 51.3404 38.5349 51.6132 38.7531C54.9959 40.8264 57.6693 43.6089 59.5789 47.1553C61.5976 50.8108 62.4705 54.7936 62.2523 58.9947C62.3068 59.5948 62.1977 60.3586 62.1432 61.177Z"
      fill="#3BB8E9"
    />
    <path
      d="M0 10.6551V11.2007C0 14.3105 0.218237 17.3659 0.545594 20.4212C0.87295 23.2037 1.364 25.9317 1.96416 28.6596C2.07328 29.1507 2.23693 29.5872 2.45517 30.0236C6.21977 38.0984 15.0038 42.354 23.6788 40.3899C30.2805 38.9168 35.6818 33.7882 37.5369 27.2411C38.0279 25.4406 38.1916 23.5856 38.3007 21.7306C38.3552 20.4757 38.4644 19.2754 38.6826 18.0751C40.1011 10.6551 45.0661 4.54441 51.9951 1.65276C52.377 1.48908 52.7589 1.32541 53.1954 1.21629C53.2499 1.21629 53.3591 1.16173 53.3045 1.10717C52.2133 0.725253 45.6662 0.0705412 41.7379 0.0159818C33.3358 -0.147696 25.0428 0.943491 16.968 3.39866C11.021 5.09 5.40138 7.54517 0 10.6551Z"
      fill="#F5A81C"
    />
  </svg>

  <svg
    v-else-if="name === 'cardano'"
    width="87"
    height="80"
    viewBox="0 0 87 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M36.3649 33.9642C34.1833 33.9642 32.1471 32.7279 31.129 30.7645C29.6746 27.9284 30.8381 24.3651 33.747 22.9107C34.5469 22.4743 35.4922 22.2562 36.3649 22.2562C38.5465 22.2562 40.5827 23.4924 41.6008 25.4559C43.0552 28.292 41.8917 31.8553 39.0556 33.3097C38.1829 33.746 37.3103 33.9642 36.3649 33.9642ZM29.5292 45.8904C29.3837 45.8904 29.311 45.8904 29.1656 45.8904C25.9658 45.6722 23.4933 42.9088 23.7115 39.7091C23.857 36.5094 26.6203 34.0369 29.8928 34.2551C33.0925 34.4005 35.565 37.1639 35.3468 40.4363C35.2014 43.4179 32.6561 45.8904 29.5292 45.8904ZM36.4376 57.7438C35.2741 57.7438 34.1833 57.3802 33.2379 56.7985C31.9289 55.9258 31.0563 54.6168 30.7654 53.0897C30.4745 51.5626 30.7654 50.0354 31.5653 48.7265C32.6561 47.0539 34.4742 46.1085 36.4376 46.1085C37.6011 46.1085 38.692 46.4721 39.6373 47.0539C40.9463 47.9265 41.8189 49.2355 42.1825 50.7627C42.4734 52.2898 42.1825 53.8169 41.3826 55.1259C40.2191 56.7257 38.4011 57.7438 36.4376 57.7438ZM50.1818 57.7438C48.0002 57.7438 45.964 56.5076 44.9459 54.5441C44.2187 53.1624 44.146 51.5626 44.5823 50.1082C45.0914 48.6538 46.1095 47.4175 47.4912 46.763C48.2911 46.3267 49.2364 46.1085 50.1091 46.1085C52.2907 46.1085 54.3269 47.3448 55.345 49.3082C56.7994 52.1443 55.6359 55.7076 52.727 57.1621C51.9998 57.5257 51.0545 57.7438 50.1818 57.7438ZM57.0175 45.8176C56.8721 45.8176 56.7994 45.8176 56.6539 45.8176C53.4542 45.6722 50.9817 42.9088 51.1999 39.6364C51.4181 36.4367 54.1087 33.9642 57.3812 34.1096C58.9083 34.1824 60.3627 34.9096 61.3808 36.0731C62.3989 37.2366 62.9079 38.7638 62.8352 40.2909C62.6898 43.4179 60.0718 45.8176 57.0175 45.8176ZM50.1091 33.8915C48.9456 33.8915 47.8548 33.5279 46.9094 32.9461C44.2187 31.2008 43.4915 27.5648 45.2368 24.8741C46.3276 23.2015 48.1456 22.2562 50.1091 22.2562C51.2726 22.2562 52.3634 22.6198 53.3088 23.2015C55.9995 24.9468 56.7267 28.5829 54.9814 31.2735C53.8906 32.9461 52.0725 33.8915 50.1091 33.8915ZM30.5472 12.2934C31.2745 13.7479 30.6927 15.4932 29.2383 16.2204C27.7839 16.9476 26.0386 16.3658 25.3114 14.9114C24.5842 13.457 25.1659 11.7117 26.6203 10.9845C28.0747 10.2573 29.82 10.839 30.5472 12.2934ZM12.8761 37.1639C14.476 37.2366 15.7122 38.6183 15.6395 40.2182C15.5668 41.818 14.1851 43.0543 12.5853 42.9815C10.9854 42.9088 9.74915 41.5271 9.82188 39.9273C9.8946 38.3274 11.2763 37.0912 12.8761 37.1639ZM25.6022 64.8704C26.4749 63.5615 28.2929 63.1252 29.6019 64.0705C30.9836 64.9432 31.3472 66.7612 30.4745 68.0702C29.6019 69.3791 27.7839 69.8155 26.4749 68.9428C25.0932 67.9974 24.7296 66.2521 25.6022 64.8704ZM55.9995 67.7065C55.2723 66.2521 55.854 64.5068 57.3084 63.7796C58.7628 63.0524 60.5081 63.6342 61.2353 65.0886C61.9625 66.543 61.3808 68.2883 59.9264 69.0155C58.472 69.7427 56.7267 69.161 55.9995 67.7065ZM73.6706 42.8361C72.0707 42.7634 70.8345 41.3817 70.9072 39.7818C70.9799 38.182 72.3616 36.9457 73.9614 37.0185C75.5613 37.0912 76.7976 38.4729 76.7248 40.0727C76.6521 41.6726 75.2704 42.9088 73.6706 42.8361ZM60.9445 15.1296C60.0718 16.5112 58.2538 16.8748 56.9448 16.0022C55.5631 15.1296 55.1995 13.3115 56.0722 12.0026C56.9448 10.6209 58.7628 10.2573 60.0718 11.1299C61.4535 12.0026 61.8171 13.7479 60.9445 15.1296ZM24.1478 3.34881C24.5842 4.29418 24.2206 5.38499 23.3479 5.89404C22.4025 6.33036 21.3117 5.96676 20.8027 5.09411C20.3664 4.14874 20.73 3.05793 21.6026 2.54889C22.548 2.03984 23.7115 2.40345 24.1478 3.34881ZM1.96805 38.182C2.98614 38.2547 3.78607 39.1274 3.71334 40.1454C3.64062 41.1635 2.76798 41.9635 1.74989 41.8907C0.7318 41.818 -0.0681271 40.9454 0.00459353 39.9273C0.0773141 38.9092 0.949961 38.182 1.96805 38.182ZM21.0936 74.8332C21.6753 73.9605 22.8389 73.7424 23.7115 74.3241C24.5842 74.9059 24.8023 76.0694 24.2206 76.9421C23.6388 77.8147 22.4753 78.0329 21.6026 77.4511C20.73 76.8693 20.5118 75.7058 21.0936 74.8332ZM62.3989 76.6512C61.9626 75.7058 62.3262 74.615 63.1988 74.106C64.1442 73.6696 65.235 74.0332 65.744 74.9059C66.1803 75.8513 65.8167 76.9421 64.9441 77.4511C63.9987 77.9602 62.8352 77.5966 62.3989 76.6512ZM84.5787 41.818C83.5606 41.7453 82.7606 40.8726 82.8334 39.8546C82.9061 38.8365 83.7787 38.0365 84.7968 38.1093C85.8149 38.182 86.6148 39.0546 86.5421 40.0727C86.4694 41.0181 85.5967 41.818 84.5787 41.818ZM65.4531 5.16683C64.8714 6.03948 63.7078 6.25764 62.8352 5.67587C61.9626 5.09411 61.7444 3.93058 62.3262 3.05793C62.9079 2.18528 64.0714 1.96712 64.9441 2.54889C65.8167 3.13065 66.0349 4.29418 65.4531 5.16683ZM24.7296 25.4559C26.3295 26.474 26.7658 28.5829 25.7477 30.1827C24.7296 31.7826 22.6207 32.2189 21.0208 31.2008C19.421 30.1827 18.9847 28.0738 20.0028 26.474C21.0208 24.8014 23.2025 24.3651 24.7296 25.4559ZM21.3845 48.7265C23.057 47.8538 25.1659 48.581 25.9659 50.2536C26.8385 51.9262 26.1113 54.0351 24.4387 54.835C22.7661 55.7077 20.6572 54.9804 19.8573 53.3079C18.9847 51.6353 19.7119 49.5991 21.3845 48.7265ZM39.6373 63.3433C39.71 61.4526 41.3826 59.9982 43.2734 60.1436C45.1641 60.2163 46.6185 61.8889 46.4731 63.7796C46.4003 65.6704 44.7278 67.1248 42.837 66.9793C41.019 66.8339 39.5646 65.234 39.6373 63.3433ZM61.8171 54.6168C60.2173 53.5988 59.7809 51.4899 60.799 49.89C61.8171 48.2901 63.926 47.8538 65.5259 48.8719C67.1257 49.89 67.562 51.9989 66.5439 53.5988C65.5259 55.1986 63.3442 55.6349 61.8171 54.6168ZM65.1623 31.2735C63.4897 32.1462 61.3808 31.419 60.5809 29.7464C59.7082 28.0738 60.4354 25.9649 62.108 25.165C63.7806 24.2923 65.8895 25.0196 66.6894 26.6921C67.562 28.3647 66.8348 30.4009 65.1623 31.2735ZM46.6185 16.6567C46.5458 18.5474 44.8732 20.0018 42.9825 19.8564C41.0917 19.7837 39.6373 18.1111 39.7828 16.2204C39.8555 14.3296 41.5281 12.8752 43.4188 13.0207C45.3095 13.1661 46.7639 14.7659 46.6185 16.6567ZM12.0035 19.2746C13.0943 20.0018 13.3852 21.4562 12.658 22.6198C11.9308 23.7106 10.4764 24.0742 9.31283 23.2743C8.22202 22.5471 7.93114 21.0926 8.65835 19.9291C9.38555 18.8383 10.9127 18.5474 12.0035 19.2746ZM9.67643 56.7257C10.84 56.144 12.2944 56.5803 12.8761 57.8165C13.4579 58.9801 13.0216 60.4345 11.7853 61.0163C10.6218 61.598 9.16739 61.1617 8.58562 59.9254C8.00386 58.7619 8.5129 57.3075 9.67643 56.7257ZM40.7281 77.4511C40.8009 76.1421 41.9644 75.1241 43.2734 75.1968C44.5823 75.2695 45.6004 76.433 45.5277 77.742C45.455 79.051 44.2914 80.0691 42.9825 79.9963C41.6735 79.9236 40.6554 78.7601 40.7281 77.4511ZM74.5432 60.7254C73.4524 59.9982 73.1615 58.5438 73.8887 57.3802C74.6159 56.2894 76.0703 55.9258 77.2339 56.653C78.3247 57.3802 78.6156 58.8346 77.8884 59.9982C77.1612 61.1617 75.634 61.4526 74.5432 60.7254ZM76.8703 23.2743C75.7067 23.856 74.2523 23.4197 73.6706 22.1835C73.0888 21.0199 73.5251 19.5655 74.7614 18.9837C75.9249 18.402 77.3793 18.8383 77.9611 20.0746C78.5428 21.2381 78.0338 22.6925 76.8703 23.2743ZM45.6004 2.54889C45.5277 3.85786 44.3642 4.87595 43.0552 4.80323C41.7462 4.73051 40.7281 3.56698 40.8009 2.25801C40.8736 0.949034 42.0371 -0.0690544 43.3461 0.00366621C44.655 0.0763868 45.6731 1.23992 45.6004 2.54889Z"
      fill="#3BB8E9"
    />
  </svg>

  <svg
    v-else-if="name === 'ethereum'"
    width="50"
    height="80"
    viewBox="0 0 50 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.5528 0L24.0168 1.8232V54.72L24.5528 55.2552L49.1056 40.7424L24.5528 0Z"
      fill="#343434"
    />
    <path
      d="M24.5528 0L0 40.7424L24.5528 55.256V0Z"
      fill="#8C8C8C"
    />
    <path
      d="M24.5528 59.9056L24.2504 60.2744V79.12L24.5528 80L49.12 45.4L24.5528 59.9056Z"
      fill="#3C3C3B"
    />
    <path
      d="M24.5528 80V59.9048L0 45.4L24.5528 80Z"
      fill="#8C8C8C"
    />
    <path
      d="M24.5528 55.256L49.1048 40.7424L24.5528 29.5824V55.256Z"
      fill="#141414"
    />
    <path
      d="M0 40.7424L24.552 55.256V29.5816"
      fill="#393939"
    />
  </svg>

  <svg
    v-else-if="name === 'neo'"
    width="68"
    height="80"
    viewBox="0 0 68 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 15.2036L26.7872 27.8732V80L0 67.3304V15.2036V15.2036ZM40.5428 0L1.286 13.9576L27.8332 26.7072L66.9684 12.6696L40.5428 0ZM39.8188 23.8516V55.7468L67.692 66.6064V13.8356L39.8188 23.8516Z"
      fill="url(#paint0_linear)"
    />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="1.5096"
        y1="68.4816"
        x2="50.6196"
        y2="26.4904"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#BEEA2E" />
        <stop
          offset="1"
          stop-color="#52BA00"
        />
      </linearGradient>
    </defs>
  </svg>

  <svg
    v-else-if="name === 'litecoin'"
    width="81"
    height="81"
    viewBox="0 0 81 81"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40.0049 0C32.0926 0 24.3581 2.34624 17.7794 6.74203C11.2006 11.1378 6.07308 17.3857 3.04521 24.6956C0.0173334 32.0056 -0.774896 40.0492 0.7687 47.8094C2.3123 55.5696 6.12239 62.6977 11.7172 68.2925C17.3119 73.8873 24.4401 77.6974 32.2003 79.241C39.9605 80.7846 48.0041 79.9924 55.314 76.9645C62.624 73.9366 68.8719 68.8091 73.2677 62.2303C77.6635 55.6516 80.0097 47.917 80.0097 40.0048C80.0097 34.7513 78.9749 29.5493 76.9645 24.6956C74.9541 19.842 72.0073 15.4319 68.2926 11.7171C64.5778 8.00235 60.1677 5.05562 55.314 3.04519C50.4604 1.03476 45.2584 0 40.0049 0V0ZM40.6532 41.3209L36.4921 55.3623H58.7493C58.9263 55.3627 59.1007 55.4043 59.2589 55.4837C59.4171 55.5632 59.5546 55.6783 59.6607 55.82C59.7667 55.9617 59.8384 56.1261 59.87 56.3003C59.9016 56.4745 59.8923 56.6536 59.8428 56.8235L57.9074 63.491C57.815 63.8095 57.6216 64.0894 57.3563 64.2884C57.0909 64.4874 56.7681 64.5947 56.4365 64.5942H22.4411L28.1892 45.182L21.8314 47.1175L23.2346 42.5789L29.6021 40.6435L37.6727 13.3737C37.7614 13.0541 37.9523 12.7723 38.2161 12.5714C38.4799 12.3705 38.8023 12.2614 39.1339 12.2608H47.7465C47.9232 12.2602 48.0977 12.3006 48.2561 12.3788C48.4146 12.4571 48.5528 12.571 48.6597 12.7117C48.7666 12.8524 48.8395 13.0161 48.8724 13.1897C48.9054 13.3633 48.8976 13.5422 48.8497 13.7123L42.0757 36.7727L48.4336 34.8373L47.0691 39.4532L40.6532 41.3209Z"
      fill="#A5A8A9"
    />
  </svg>

  <svg
    v-else-if="name === 'dash'"
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80Z"
      fill="#2573C2"
    />
    <path
      d="M66.1041 29.472C66.0504 28.5756 65.7874 27.7043 65.3361 26.928C64.9361 26.128 64.2241 25.504 63.3921 25.184C62.5436 24.7611 61.6037 24.555 60.6561 24.584H25.1521L22.6081 32.208H54.7761L49.6961 47.792H17.536L14.992 55.4159H50.6641C51.727 55.3852 52.7779 55.1826 53.7761 54.8159C54.7761 54.2479 55.9201 53.6719 56.8881 52.8719C57.8331 52.1269 58.687 51.273 59.4321 50.3279C60.048 49.402 60.5731 48.4188 61.0001 47.392L65.7121 32.576C66.1408 31.6012 66.277 30.5228 66.1041 29.472Z"
      fill="white"
    />
    <path
      d="M35.288 36.464H16.36L13.816 43.5121H32.936L35.288 36.464Z"
      fill="white"
    />
  </svg>

  <svg
    v-else-if="name === 'monero'"
    width="81"
    height="80"
    viewBox="0 0 81 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40 0C17.9122 0 0 17.9118 0 40.0003C0 44.4151 0.715636 48.6617 2.03691 52.6349H14.0002V18.9794L40.0006 44.9798L66.0004 18.9794V52.6346H77.9637C79.2859 48.6614 80.0016 44.4148 80.0016 40C80.0013 17.9109 62.0888 0 40 0Z"
      fill="#FF6600"
    />
    <path
      d="M34.0214 50.9577L22.6743 39.6103V60.7872H5.8197C12.8417 72.3071 25.5234 80 39.9993 80C54.4752 80 67.1582 72.3071 74.1792 60.7872H57.3249V39.61L45.9778 50.9571L39.9996 56.935L34.022 50.9574H34.0214V50.9577Z"
      fill="#4C4C4C"
    />
  </svg>

  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    style="isolation:isolate"
    viewBox="0 0 43 40"
  >
    <path
      d="M20 4c-2-2-5-4-9-4C5 0 0 5 0 12q0 9 20 23 20-13 20-23c0-9-5-12-11-12-4 0-7 2-9 4z"
    />
  </svg>
  `
})
export default class extends Vue {
  @Prop({ default: 'love' }) name!: string
  @Prop({ default: true }) colorful!: boolean
}
