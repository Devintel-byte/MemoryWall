export const APP_INFO = {
  name: "Hennessy Photobooth",
  description: "A photobooth application for Hennessy events",
  photo: {
    countdown: 3000 /* in milliseconds */,
    width: 600,
    height: 450,
    mobile: {
      width: 300,
      height: 350,
    },
  },
  email:"The email body goes here. Replace with what you want" //put your email body here
};

export const card = {
  header: {
    background: "/backgrounds/blog_header.webp",
  },
  colors: {
    primary: "red",
    secondary: "blue",
  },
  brands: [
    //  {image: "/images/logo.png" , alt: "logo"},
    { image: "/T2-orange.png", alt: "T2 logo" },
  ],
};

export const COMPANY_INFO = {
  name: "Moving Surface",
  description: "An Event Tech Company",
  tagline: "Redefining memorable Events through novel interactive Solutions",
  address: {
    location: "222, 1st Ave Efab Estate",
    state: "Abuja",
    country: "Nigeria",
  },
  socials: [
    {
      value: "facebook" ,
      name: "FaceBook",
      icon: "eva:facebook-fill",
      color: "#1877F2",
      path: "https://web.facebook.com/movingsurface/",
    },
    {
      value: "instagram" ,
      name: "Instagram",
      icon: "ant-design:instagram-filled",
      color: "#E02D69",
      path: "https://www.instagram.com/movingsurface_ng",
    },
    {
      value: "vimeo" ,
      name: "Vimeo",
      icon: "eva:linkedin-fill",
      color: "#007EBB",
      path: "https://vimeo.com/user70284860",
    },
    {
      value: "twitter" ,
      name: "Twitter",
      icon: "eva:twitter-fill",
      color: "#00AAEC",
      path: "https://twitter.com/movingsurface",
    },
    {
      value: "youtube" ,
      name: "YouTube",
      icon: "ant-design:youtube-filled",
      color: "#ec0034",
      path: "https://www.youtube.com/channel/UCr5pPQp8Wui_eX_XY0DXp4g/featured",
    },
  ],

  contact: {
    email: "hello@movingsurface.com.ng",
    phone: ["+234 803-533-5178", "+234 814-442-2144"],
    website: "https://movingsurface.com.ng",
  },

  legal: {
    marketing: {
      text: "I consent to use my data for marketing purposes production",
      link: "https://example.com/privacy",
    },
    terms: {
      text: "I consent for Mon Hennessy to use my data for marketing purposes and promote LVMH Group production",
      link: "https://example.com/privacy",
    },
    privacy: {
      text: "I accept the full privacy notice",
      link: "https://example.com/privacy",
    },
  },
};
