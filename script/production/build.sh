mode=production
# vue-tsc로 typescript를 컴파일
source script/common/lib/pre-build.sh
# firebase.json을 최상위로 copy
source script/${mode}/lib/firebase-update.sh
# copy.sh로 dist를 최상위로 copy
source script/${mode}/lib/copy.sh
# vite로 build
vite build --mode ${mode}