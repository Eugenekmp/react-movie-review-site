import { useLocale, useSetLocale } from "../contexts/LocaleContext";

function LocaleSelect() {
  const locale = useLocale();
  const setLocale = useSetLocale();

  return (
    <select value={locale} onChange={(e) => setLocale(e.target.value)}>
      <option value="ko">한국어</option>
      <option value="en">English</option>
    </select>
  );
}

export default LocaleSelect;
