import { defineStore } from "pinia";

//차피 한번에 많이 불러오는 경우는 적을게 아니라 거의 없음
// 따라서 하루 한번정도 업데이트 하는 형식으로 가고
// recent Enter 값을 localStorage를 통해 저장해두자
// 그리고 그 값이 하루가 지났는지 확인하고 지났으면 업데이트를 하자

interface ISafeArea {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export const useDefault = defineStore({
  id: "default",
  state: () => ({
    // null 상태를 분류해둔 이유는 사용자가 /list로 바로 접근했을때를 대비함
    // 추후 null일때는 랜덤으로 store를 불러와서 전시할 예정
    _safeAreaInsets: { top: 0, right: 0, bottom: 0, left: 0 } as ISafeArea,
    _platform: "",
  }),
  getters: {
    getSafeAreaInsets: (state): ISafeArea => {
      return state._safeAreaInsets;
    },
  },
  actions: {
    setSafeAreaInsets(insets: ISafeArea) {
      this._safeAreaInsets = insets;
    },
    setPlatform(platform: string) {
      this._platform = platform;
    },
  },
});
