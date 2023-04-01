import { HTMLAttributes, forwardRef } from "react";

interface SuggestionListProps {}

const SuggestionList = forwardRef(({}: SuggestionListProps, ref) => {
  return <div>SuggestionList</div>;
});

SuggestionList.displayName = "SuggestionList";
export default SuggestionList;
