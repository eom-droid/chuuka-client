mode=development
source script/common/lib/pre-build.sh
source script/${mode}/lib/firebase-update.sh
source script/${mode}/lib/copy.sh
vite build --mode ${mode}