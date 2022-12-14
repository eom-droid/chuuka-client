import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

library.add(faChevronUp);
library.add(faChevronDown);

// 사용방법
// <font-awesome-icon icon="redo-alt" />

export default FontAwesomeIcon;
