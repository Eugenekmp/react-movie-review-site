import { useLocale } from "../contexts/LocaleContext";

const dict = {
  ko: {
    // 버튼
    "confirm button": "확인",
    "cancel button": "취소",
    "edit button": "수정",
    "delete button": "삭제",
    "create button": "추가하기",
    "load more": "더보기",
    "submit button": "작성완료",

    // 정렬
    "sort by latest": "최신순",
    "sort by best": "베스트순",

    // 모달 제목
    "edit review title": "리뷰 수정",
    "create review title": "리뷰 생성",

    // 입력 필드 플레이스홀더
    "review title placeholder": "제목을 입력해 주세요.",
    "review rating placeholder": "별점을 입력해 주세요.",
    "review content placeholder": "내용을 입력해 주세요.",

    // 언어 선택
    language: "한국어",

    // 에러 메시지
    "locale provider error": "반드시 LocaleProvider 안에서 사용해야 합니다",

    // 푸터
    "terms of service": "서비스 이용약관",
    "privacy policy": "개인정보 처리방침",
  },
  en: {
    // Buttons
    "confirm button": "OK",
    "cancel button": "Cancel",
    "edit button": "Edit",
    "delete button": "Delete",
    "create button": "Create",
    "load more": "Load More",
    "submit button": "Submit",

    // Sorting
    "sort by latest": "Latest",
    "sort by best": "Best Rated",

    // Modal titles
    "edit review title": "Edit Review",
    "create review title": "Create Review",

    // Input field placeholders
    "review title placeholder": "Enter title",
    "review rating placeholder": "Select rating",
    "review content placeholder": "Enter content",

    // Language selection
    language: "English",

    // Error messages
    "locale provider error": "Must be used within LocaleProvider",

    // Footer
    "terms of service": "Terms of Service",
    "privacy policy": "Privacy Policy",
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || "";

  return translate;
}

export default useTranslate;
