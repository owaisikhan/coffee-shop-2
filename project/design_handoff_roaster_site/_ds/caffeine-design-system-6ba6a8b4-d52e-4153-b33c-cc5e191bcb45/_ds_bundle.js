/* @ds-bundle: {"format":4,"namespace":"CaffeineDesignSystem_6ba6a8","components":[{"name":"PhotoFrame","sourcePath":"components/content/PhotoFrame.jsx"},{"name":"ProductCard","sourcePath":"components/content/ProductCard.jsx"},{"name":"SectionHeading","sourcePath":"components/content/SectionHeading.jsx"},{"name":"StarRating","sourcePath":"components/content/StarRating.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"TestimonialCard","sourcePath":"components/content/TestimonialCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"EmailSignup","sourcePath":"components/forms/EmailSignup.jsx"},{"name":"CarouselNav","sourcePath":"components/navigation/CarouselNav.jsx"},{"name":"FilterTabs","sourcePath":"components/navigation/FilterTabs.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"},{"name":"SocialLinks","sourcePath":"components/navigation/SocialLinks.jsx"}],"sourceHashes":{"components/content/PhotoFrame.jsx":"33a78291680d","components/content/ProductCard.jsx":"26c1bb524144","components/content/SectionHeading.jsx":"7030f3759886","components/content/StarRating.jsx":"c9a629788120","components/content/StatBlock.jsx":"885dd982bd1e","components/content/TestimonialCard.jsx":"b8dcd428deea","components/core/Button.jsx":"50b6fe4bebd1","components/core/Icon.jsx":"2fddd843a5fe","components/core/IconButton.jsx":"1a5e9d2e16c3","components/core/Logo.jsx":"775edae63bc1","components/forms/EmailSignup.jsx":"7707e8a33eb7","components/navigation/CarouselNav.jsx":"5b5eef6cd67e","components/navigation/FilterTabs.jsx":"c5befebe4546","components/navigation/NavBar.jsx":"2862d64b79ca","components/navigation/SocialLinks.jsx":"6a5f0383cb34","ui_kits/website/BestSelling.jsx":"1fc2d0b77ae1","ui_kits/website/FeatureRows.jsx":"429647e3d672","ui_kits/website/Hero.jsx":"cdc787e7900f","ui_kits/website/HomePage.jsx":"f514a52318e4","ui_kits/website/Newsletter.jsx":"a17da1526c20","ui_kits/website/SiteFooter.jsx":"2426d1939d77","ui_kits/website/Testimonials.jsx":"e83b08843848"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CaffeineDesignSystem_6ba6a8 = window.CaffeineDesignSystem_6ba6a8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/content/PhotoFrame.jsx
try { (() => {
function PhotoFrame({
  src,
  alt = '',
  width = 300,
  height = 380,
  tilt = -4,
  mat = 12,
  decor = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width,
      height,
      ...style
    }
  }, decor && /*#__PURE__*/React.createElement("svg", {
    width: width,
    height: height,
    viewBox: `0 0 ${width} ${height}`,
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      overflow: 'visible'
    },
    fill: "none",
    stroke: "var(--decor-outline)",
    strokeWidth: "1"
  }, /*#__PURE__*/React.createElement("path", {
    d: `M${width * 0.18} -18 L${width * 0.62} -18 L${width * 0.18} 42 Z`
  }), /*#__PURE__*/React.createElement("path", {
    d: `M${width * 0.82} ${height - 42} L${width + 18} ${height - 96} L${width + 18} ${height - 18} Z`
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      transform: `rotate(${tilt}deg)`,
      background: 'var(--surface-photo-mat)',
      padding: mat,
      boxShadow: 'var(--shadow-photo)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  })));
}
Object.assign(__ds_scope, { PhotoFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PhotoFrame.jsx", error: String((e && e.message) || e) }); }

// components/content/ProductCard.jsx
try { (() => {
function ProductCard({
  name,
  image,
  action = 'Order Now',
  onAction,
  width = 300,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 'calc(-1 * var(--offset-frame))',
      top: 'calc(-1 * var(--offset-frame))',
      right: 'var(--offset-frame)',
      bottom: 'var(--offset-frame)',
      background: 'var(--espresso-900)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'var(--cream-200)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      width: '100%',
      aspectRatio: '1 / 1',
      objectFit: 'cover',
      display: 'block'
    }
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-heading-3)',
      textAlign: 'center',
      padding: '0 var(--space-4) var(--space-4)'
    }
  }, name), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAction,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: '100%',
      height: 'var(--control-h)',
      border: 'none',
      borderTop: '1px solid var(--border-hairline)',
      background: hover ? 'var(--tan-300)' : 'var(--cream-100)',
      color: 'var(--espresso-900)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      cursor: 'pointer',
      transition: 'background var(--dur) var(--ease-standard)'
    }
  }, action)));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHeading.jsx
try { (() => {
function SectionHeading({
  title,
  body,
  align = 'center',
  tone = 'dark',
  size = 'lg',
  maxWidth = 620,
  children,
  style
}) {
  const onDark = tone === 'light';
  const fs = size === 'lg' ? 'var(--text-heading-1)' : 'var(--text-heading-2)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: fs,
      lineHeight: 'var(--lh-heading-1)',
      color: onDark ? 'var(--text-on-dark)' : 'var(--text-heading)',
      margin: 0
    }
  }, title), body && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-small)',
      lineHeight: 'var(--lh-body)',
      color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-body)',
      maxWidth
    }
  }, body), children);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/content/StarRating.jsx
try { (() => {
const STAR = 'M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.2 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z';
function StarRating({
  value = 5,
  max = 5,
  size = 14,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    role: "img",
    "aria-label": `${value} out of ${max}`,
    style: {
      display: 'flex',
      gap: 3,
      ...style
    }
  }, Array.from({
    length: max
  }, (_, i) => /*#__PURE__*/React.createElement("svg", {
    key: i,
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": "true",
    fill: i < value ? 'var(--accent-star)' : 'rgba(239,223,196,.25)',
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: STAR
  }))));
}
Object.assign(__ds_scope, { StarRating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StarRating.jsx", error: String((e && e.message) || e) }); }

// components/content/StatBlock.jsx
try { (() => {
function StatBlock({
  value,
  label,
  tone = 'light',
  style
}) {
  const onDark = tone === 'light';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-black)',
      fontSize: 'var(--text-heading-3)',
      color: onDark ? 'var(--text-on-dark)' : 'var(--text-heading)'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-micro)',
      letterSpacing: 'var(--tracking-label)',
      textTransform: 'uppercase',
      color: onDark ? 'var(--text-on-dark-muted)' : 'var(--text-muted)'
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/content/TestimonialCard.jsx
try { (() => {
function TestimonialCard({
  quote,
  name,
  avatar,
  rating = 5,
  width = 700,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width,
      paddingTop: 44,
      ...style
    }
  }, avatar && /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: name,
    style: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 88,
      height: 88,
      borderRadius: 'var(--radius-full)',
      objectFit: 'cover',
      border: '3px solid var(--cream-100)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card-dark)',
      padding: '68px var(--space-9) var(--space-7)',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      lineHeight: 'var(--lh-body)',
      color: 'var(--text-on-dark-muted)'
    }
  }, quote), /*#__PURE__*/React.createElement(__ds_scope.StarRating, {
    value: rating
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-bold)',
      fontSize: 'var(--text-body-lg)',
      color: 'var(--text-on-dark)'
    }
  }, name)));
}
Object.assign(__ds_scope, { TestimonialCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/TestimonialCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// Lucide-derived line glyphs (1.75px stroke, square caps) — see readme ICONOGRAPHY.
const PATHS = {
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-left': 'M19 12H5M11 18l-6-6 6-6',
  'search': 'M11 3a8 8 0 1 0 0 16 8 8 0 0 0 0-16zM21 21l-4.35-4.35',
  'chevron-down': 'M6 9l6 6 6-6',
  'play': 'M7 4l12 8-12 8z',
  'mail': 'M3 6h18v12H3zM3 6l9 7 9-7',
  'phone': 'M4 4h5l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v5a15 15 0 0 1-16-16z',
  'map-pin': 'M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
};
function Icon({
  name = 'arrow-right',
  size = 18,
  strokeWidth = 1.75,
  fill = false,
  color = 'currentColor',
  style,
  ...rest
}) {
  const d = PATHS[name] || PATHS['arrow-right'];
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    "aria-hidden": "true",
    style: {
      display: 'block',
      flex: '0 0 auto',
      ...style
    },
    fill: fill ? color : 'none',
    stroke: fill ? 'none' : color,
    strokeWidth: strokeWidth,
    strokeLinecap: "square",
    strokeLinejoin: "miter"
  }, rest), /*#__PURE__*/React.createElement("path", {
    d: d
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const V = {
  primary: {
    background: 'var(--btn-primary-bg)',
    color: 'var(--btn-primary-fg)',
    border: '1px solid var(--btn-primary-bg)',
    hover: 'var(--btn-primary-bg-hover)'
  },
  dark: {
    background: 'var(--btn-dark-bg)',
    color: 'var(--btn-dark-fg)',
    border: '1px solid var(--btn-dark-bg)',
    hover: 'var(--btn-dark-bg-hover)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--btn-ghost-fg)',
    border: '1px solid var(--btn-ghost-border)',
    hover: 'var(--btn-ghost-bg-hover)'
  },
  outline: {
    background: 'transparent',
    color: 'var(--text-heading)',
    border: '1px solid var(--border-dark)',
    hover: 'rgba(27,17,7,.08)'
  }
};
function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon = 'arrow-right',
  showIcon = true,
  disabled,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const v = V[variant] || V.primary;
  const sm = size === 'sm';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: sm ? 8 : 10,
      height: sm ? 'var(--control-h-sm)' : 'var(--control-h)',
      padding: sm ? '0 14px' : '0 var(--control-px)',
      fontFamily: 'var(--font-body)',
      fontSize: sm ? 'var(--text-small)' : 'var(--text-body)',
      fontWeight: 'var(--weight-medium)',
      letterSpacing: 'var(--tracking-normal)',
      borderRadius: 'var(--radius-none)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      background: hover && !disabled ? v.hover : v.background,
      color: v.color,
      border: v.border,
      transform: 'translateY(0)',
      transition: 'background var(--dur) var(--ease-standard), color var(--dur) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'nowrap',
      flex: '0 0 auto'
    }
  }, children), showIcon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: sm ? 14 : 16
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function IconButton({
  icon = 'arrow-right',
  variant = 'dark',
  size = 40,
  label,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dark = variant === 'dark';
  const tan = variant === 'tan';
  const bg = dark ? 'var(--espresso-900)' : tan ? 'var(--tan-400)' : 'transparent';
  const hoverBg = dark ? 'var(--espresso-700)' : tan ? 'var(--tan-500)' : 'rgba(27,17,7,.08)';
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label || icon,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? hoverBg : bg,
      color: dark ? 'var(--cream-100)' : 'var(--espresso-900)',
      border: variant === 'outline' ? '1px solid var(--border-dark)' : '1px solid transparent',
      borderRadius: 'var(--radius-none)',
      cursor: 'pointer',
      transition: 'background var(--dur) var(--ease-standard)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: Math.round(size * 0.4)
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function Logo({
  size = 22,
  color = 'var(--cream-100)',
  boxed = false,
  style
}) {
  const word = /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-black)',
      fontSize: size,
      lineHeight: 1.1,
      color,
      letterSpacing: 'var(--tracking-tight)'
    }
  }, "Caffeine");
  if (!boxed) return /*#__PURE__*/React.createElement("span", {
    style: style
  }, word);
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '28px 36px',
      border: '1px solid var(--border-on-dark)',
      background: 'var(--cream-200)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-black)',
      fontSize: size,
      color: 'var(--espresso-900)'
    }
  }, "Caffeine"));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/forms/EmailSignup.jsx
try { (() => {
function EmailSignup({
  placeholder = 'Enter Your Email Address',
  onSubmit,
  width = 420,
  style
}) {
  const [value, setValue] = React.useState('');
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onSubmit && onSubmit(value);
      setValue('');
    },
    style: {
      display: 'flex',
      width,
      background: 'var(--surface-field)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => setValue(e.target.value),
    placeholder: placeholder,
    "aria-label": "Email address",
    style: {
      flex: 1,
      height: 52,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      padding: '0 var(--space-4)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-small)',
      color: 'var(--espresso-900)'
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-right",
    variant: "dark",
    size: 52,
    label: "Subscribe",
    onClick: () => {},
    style: {
      pointerEvents: 'none'
    }
  }));
}
Object.assign(__ds_scope, { EmailSignup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/EmailSignup.jsx", error: String((e && e.message) || e) }); }

// components/navigation/CarouselNav.jsx
try { (() => {
function CarouselNav({
  onPrev,
  onNext,
  size = 40,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-left",
    variant: "tan",
    size: size,
    label: "Previous",
    onClick: onPrev
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "arrow-right",
    variant: "dark",
    size: size,
    label: "Next",
    onClick: onNext
  }));
}
Object.assign(__ds_scope, { CarouselNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/CarouselNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/FilterTabs.jsx
try { (() => {
function FilterTabs({
  items = ['All', 'Black', 'Espresso', 'Doppio'],
  value,
  onChange,
  style
}) {
  const [internal, setInternal] = React.useState(items[0]);
  const active = value !== undefined ? value : internal;
  const pick = i => {
    setInternal(i);
    onChange && onChange(i);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      justifyContent: 'center',
      ...style
    }
  }, items.map(i => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    onClick: () => pick(i),
    style: {
      background: 'none',
      border: 'none',
      padding: '0 0 6px',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-body)',
      color: i === active ? 'var(--espresso-900)' : 'rgba(27,17,7,.55)',
      borderBottom: i === active ? '1px solid var(--espresso-900)' : '1px solid transparent',
      transition: 'color var(--dur) var(--ease-standard)'
    }
  }, i)));
}
Object.assign(__ds_scope, { FilterTabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/FilterTabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function NavBar({
  items = ['Home', 'Menu', 'About Us', 'Facilities'],
  active = 'Home',
  onSelect,
  onSignIn,
  onSearch,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-7)',
      height: 64,
      padding: '0 var(--space-5) 0 var(--space-6)',
      background: 'var(--surface-dark)',
      border: '1px solid var(--border-on-dark)',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: 22
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-6)',
      margin: '0 auto'
    }
  }, items.map(i => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onSelect && onSelect(i);
    },
    style: {
      fontSize: 'var(--text-small)',
      color: i === active ? 'var(--cream-050)' : 'var(--text-on-dark-muted)',
      opacity: i === active ? 1 : 0.72,
      textDecoration: 'none'
    }
  }, i))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onSignIn && onSignIn();
    },
    style: {
      fontSize: 'var(--text-small)',
      color: 'var(--cream-050)',
      textDecoration: 'none'
    }
  }, "Sign In"), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "search",
    label: "Search",
    size: 34,
    onClick: onSearch,
    style: {
      border: '1px solid var(--border-on-dark)'
    }
  })));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SocialLinks.jsx
try { (() => {
const CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@13/icons/';
function SocialLinks({
  networks = ['pinterest', 'instagram', 'x', 'facebook'],
  size = 28,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-3)',
      ...style
    }
  }, networks.map(n => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#",
    "aria-label": n,
    onClick: e => e.preventDefault(),
    style: {
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid var(--tan-300)',
      borderRadius: 'var(--radius-full)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size * 0.45,
      height: size * 0.45,
      background: 'var(--tan-300)',
      WebkitMaskImage: `url(${CDN}${n}.svg)`,
      maskImage: `url(${CDN}${n}.svg)`,
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      display: 'block'
    }
  }))));
}
Object.assign(__ds_scope, { SocialLinks });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SocialLinks.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/BestSelling.jsx
try { (() => {
const {
  SectionHeading,
  FilterTabs,
  ProductCard,
  CarouselNav
} = window.CaffeineDesignSystem_6ba6a8;
const ITEMS = [{
  name: 'Cappuccino',
  image: '../../assets/img-cappuccino.png',
  cat: 'Black'
}, {
  name: 'Americano',
  image: '../../assets/img-americano.png',
  cat: 'Espresso'
}, {
  name: 'Espresso',
  image: '../../assets/img-espresso.png',
  cat: 'Espresso'
}, {
  name: 'Latte Art',
  image: '../../assets/img-latte-art.png',
  cat: 'Doppio'
}, {
  name: 'Iced Coffee',
  image: '../../assets/img-iced-coffee.png',
  cat: 'Black'
}];
function BestSelling({
  onOrder
}) {
  const [tab, setTab] = React.useState('All');
  const [page, setPage] = React.useState(0);
  const list = tab === 'All' ? ITEMS : ITEMS.filter(i => i.cat === tab);
  const shown = list.length <= 3 ? list : list.slice(page % list.length).concat(list).slice(0, 3);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-warm)',
      padding: 'var(--section-y) 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "Best Selling Item",
    body: "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.",
    maxWidth: 560,
    style: {
      alignItems: 'center'
    }
  }), /*#__PURE__*/React.createElement(FilterTabs, {
    value: tab,
    onChange: t => {
      setTab(t);
      setPage(0);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 44,
      paddingTop: 'var(--space-4)',
      minHeight: 380,
      alignItems: 'flex-start'
    }
  }, shown.map((i, n) => /*#__PURE__*/React.createElement(ProductCard, {
    key: i.name + n,
    name: i.name,
    image: i.image,
    width: 300,
    onAction: () => onOrder && onOrder(i.name)
  })), shown.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-small)'
    }
  }, "No Items In This Category Yet.")), /*#__PURE__*/React.createElement(CarouselNav, {
    onPrev: () => setPage(p => p - 1),
    onNext: () => setPage(p => p + 1)
  })));
}
window.BestSelling = BestSelling;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/BestSelling.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/FeatureRows.jsx
try { (() => {
const {
  SectionHeading,
  PhotoFrame,
  Button
} = window.CaffeineDesignSystem_6ba6a8;
const ROWS = [{
  title: 'Coffee Heaven',
  image: '../../assets/img-latte-art.png',
  flip: false,
  tilt: -5
}, {
  title: "Jean's Coffee",
  image: '../../assets/img-iced-coffee.png',
  flip: true,
  tilt: 4
}];
const COPY = "Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s.";
function FeatureRows() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)',
      padding: 'var(--section-y) 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-9)'
    }
  }, ROWS.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.title,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 72,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      order: r.flip ? 2 : 1,
      display: 'flex',
      justifyContent: r.flip ? 'flex-end' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(PhotoFrame, {
    src: r.image,
    width: 310,
    height: 380,
    tilt: r.tilt
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      order: r.flip ? 1 : 2,
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    align: "center",
    title: r.title,
    body: COPY,
    maxWidth: 420,
    style: {
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "dark",
    size: "sm"
  }, "View All")))))));
}
window.FeatureRows = FeatureRows;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/FeatureRows.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
const {
  NavBar,
  Button,
  StatBlock
} = window.CaffeineDesignSystem_6ba6a8;
function Hero({
  onNav,
  active
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-dark)',
      padding: '32px 48px 88px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    active: active,
    onSelect: onNav
  }), /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -40,
      top: 120,
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: 150,
      lineHeight: .95,
      color: 'var(--watermark)',
      pointerEvents: 'none'
    }
  }, "Caffeine", /*#__PURE__*/React.createElement("br", null), "Caffeine"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 40,
      alignItems: 'center',
      marginTop: 64,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      maxWidth: 520
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 'var(--text-display-1)',
      lineHeight: 'var(--lh-display-1)',
      color: 'var(--text-on-dark)'
    }
  }, "Discover The", /*#__PURE__*/React.createElement("br", null), "Art Of Perfect", /*#__PURE__*/React.createElement("br", null), "Coffee"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-small)',
      lineHeight: 1.9,
      color: 'var(--text-on-dark-muted)',
      maxWidth: 400
    }
  }, "Experience The Rich And Bold Flavors Of Our Exquisite Coffee Blends, Crafted To Awaken Your Senses And Start Your Day Right"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary"
  }, "Order Now"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    showIcon: false
  }, "Explore More")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      marginTop: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "50+",
    label: "Item Of Coffee"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "20+",
    label: "Order Running"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "2k+",
    label: "Happy Customer"
  }))), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img-hero-cup.png",
    alt: "Coffee cup with beans falling into it",
    style: {
      width: '100%',
      maxWidth: 620,
      justifySelf: 'end',
      display: 'block'
    }
  })));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomePage.jsx
try { (() => {
function HomePage() {
  const [active, setActive] = React.useState('Home');
  const [order, setOrder] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    active: active,
    onNav: setActive
  }), /*#__PURE__*/React.createElement(FeatureRows, null), /*#__PURE__*/React.createElement(BestSelling, {
    onOrder: setOrder
  }), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(Newsletter, null), /*#__PURE__*/React.createElement(SiteFooter, null), order && /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: 'fixed',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--espresso-900)',
      color: 'var(--cream-100)',
      padding: '14px 22px',
      fontSize: 'var(--text-small)',
      border: '1px solid var(--border-on-dark)',
      display: 'flex',
      gap: 16,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", null, order, " Added To Your Order"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOrder(null),
    style: {
      background: 'none',
      border: 'none',
      color: 'var(--text-link)',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-small)'
    }
  }, "Dismiss")));
}
window.HomePage = HomePage;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Newsletter.jsx
try { (() => {
const {
  EmailSignup
} = window.CaffeineDesignSystem_6ba6a8;
function Newsletter() {
  const [email, setEmail] = React.useState(null);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-warm)',
      padding: 'var(--section-y-tight) 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 64,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 'var(--text-heading-1)',
      lineHeight: 'var(--lh-heading-1)'
    }
  }, "Stay Up To Date On", /*#__PURE__*/React.createElement("br", null), "All News And Offers."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-small)',
      color: 'var(--text-muted)',
      maxWidth: 420
    }
  }, "Be The First To Know About New Collections, Special Events, And What's Going On At Kitchen"), /*#__PURE__*/React.createElement(EmailSignup, {
    width: 470,
    onSubmit: setEmail
  }), email && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-small)',
      color: 'var(--espresso-900)'
    }
  }, "Thanks \u2014 We Will Write To ", email))));
}
window.Newsletter = Newsletter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Newsletter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/SiteFooter.jsx
try { (() => {
const {
  Logo,
  SocialLinks,
  Icon
} = window.CaffeineDesignSystem_6ba6a8;
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-dark)',
      padding: '72px 48px 0',
      color: 'var(--text-on-dark-muted)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr 1fr',
      gap: 64,
      borderBottom: '1px solid rgba(239,223,196,.15)',
      paddingBottom: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    boxed: true,
    size: 40
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-body)',
      maxWidth: 280
    }
  }, "Enjoy Better And Better Quality Coffee With Caffeine.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-heading-3)',
      color: 'var(--text-on-dark)'
    }
  }, "Contact Us"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--text-on-dark)'
    }
  }, "Caffeine@Gmail.Com"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--text-on-dark)'
    }
  }, "Call Us: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-link)'
    }
  }, "(321) 562 - 57420")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--text-on-dark)'
    }
  }, "Text Us: ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-link)'
    }
  }, "(321) 562 - 57420")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-body)',
      color: 'var(--text-link)',
      fontWeight: 'var(--weight-bold)'
    }
  }, "39 Brooklyn Street", /*#__PURE__*/React.createElement("br", null), "Covington, VA 244426")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 260
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/img-footer-beans.png",
    alt: "Coffee being prepared",
    style: {
      width: 260,
      height: 150,
      objectFit: 'cover',
      display: 'block',
      border: '1px solid rgba(239,223,196,.2)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-full)',
      background: 'rgba(27,17,7,.55)',
      border: '1px solid var(--cream-100)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 3
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    fill: true,
    size: 16,
    color: "var(--cream-100)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 'var(--text-heading-3)',
      color: 'var(--text-on-dark)'
    }
  }, "Follow Us"), /*#__PURE__*/React.createElement(SocialLinks, null)))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: 'var(--text-small)',
      padding: '22px 0',
      color: 'rgba(239,223,196,.6)'
    }
  }, "Copyright: 2023 Tophats Agency"));
}
window.SiteFooter = SiteFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Testimonials.jsx
try { (() => {
const {
  SectionHeading,
  TestimonialCard,
  IconButton
} = window.CaffeineDesignSystem_6ba6a8;
const QUOTES = [{
  name: 'Shalima Hayden',
  quote: 'I Have Tested Caffeine Coffee Many Times. Really Amazing To Me. The Combination Was Very Good. One Thing Is To Serve Extraordinary Coffee With Caffeine. I Will Order From Caffeine For Any Of My Coffee Needs'
}, {
  name: 'Marcus Delaney',
  quote: 'The Beans Arrive Fresh Every Week And The Roast Is Always Even. Caffeine Has Become The Only Place I Order From For The Shop And For Home'
}];
function Testimonials() {
  const [i, setI] = React.useState(0);
  const q = QUOTES[(i % QUOTES.length + QUOTES.length) % QUOTES.length];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)',
      padding: 'var(--section-y) 48px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    title: "What Our Customer Says",
    style: {
      alignItems: 'center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "arrow-left",
    variant: "tan",
    label: "Previous",
    onClick: () => setI(i - 1)
  }), /*#__PURE__*/React.createElement(TestimonialCard, {
    width: 720,
    avatar: "../../assets/img-avatar.png",
    name: q.name,
    quote: q.quote,
    rating: 5
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: "arrow-right",
    variant: "dark",
    label: "Next",
    onClick: () => setI(i + 1)
  }))));
}
window.Testimonials = Testimonials;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Testimonials.jsx", error: String((e && e.message) || e) }); }

__ds_ns.PhotoFrame = __ds_scope.PhotoFrame;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StarRating = __ds_scope.StarRating;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.TestimonialCard = __ds_scope.TestimonialCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.EmailSignup = __ds_scope.EmailSignup;

__ds_ns.CarouselNav = __ds_scope.CarouselNav;

__ds_ns.FilterTabs = __ds_scope.FilterTabs;

__ds_ns.NavBar = __ds_scope.NavBar;

__ds_ns.SocialLinks = __ds_scope.SocialLinks;

})();
