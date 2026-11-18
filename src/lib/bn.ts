const DIGITS = "০১২৩৪৫৬৭৮৯";

/** ইংরেজি ডিজিটকে বাংলা ডিজিটে রূপান্তর */
export const bn = (v: string | number): string =>
  String(v).replace(/\d/g, (d) => DIGITS[Number(d)]);

/** লাখ-হাজার কমাসহ বাংলা সংখ্যা, যেমন ১২,৩৪,৫৬৭ */
export const money = (x: number): string => {
  let s: string;
  try {
    s = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(Math.round(x));
  } catch {
    s = String(Math.round(x));
  }
  return bn(s);
};
