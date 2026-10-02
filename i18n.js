// i18n.js — 中／英／日切換（中文原文留在 HTML，英文、日文為對照表覆蓋；切回中文即還原）
// 用法：每頁 <head> 載入本檔；右上 float-top 會自動長出「中 | EN | 日」切換鈕。
// 優先序：網址 ?lang=en|ja|zh  >  localStorage('deckLang')  >  zh
// 新增或修改中文文案時，要同步補 EN 與 JA 兩份對照（key 為中文原文）。
(function(){
  const EN = {
 "SDK Release 品質提升方案": "SDK Release Quality Improvement Program",
 "封面": "Cover",
 "N 與 N+1 疊接進行，前一版驗證與下一版開發並行，版本銜接不中斷。": "Version N and N+1 overlap: validating the previous release runs in parallel with developing the next, so releases connect without a gap.",
 "每一版皆依相同流程執行完整 7 週": "Every release follows the same process for a full 7 weeks",
 "N+1 可提前啟動開發，但不壓縮其自身的 7 週驗證週期": "N+1 development can start early, but its own 7-week validation cycle is never compressed",
 "7 週為標準週期，遇到重大問題時保留一次彈性延長。": "7 weeks is the standard cycle; when a major issue arises, we keep room for a one-time flexible extension.",
 "出現 Critical 問題，且無法於原定週期內收斂": "A Critical issue appears and cannot be resolved within the planned cycle",
 "提前與 DMP 溝通，確認是否啟動 +1 週": "We talk with DMP early to confirm whether to activate the +1 week",
 "延長 1 週，提供完整問題修復與驗證時間": "Extend by 1 week to allow complete issue fixing and validation",
 "延長有上限，不會無限期延後。": "Extensions are capped, so the schedule cannot slip indefinitely.",
 "7 週 → 8 週：": "7 weeks → 8 weeks: ",
 "機制內建的一次性延長，提前納入規劃": "a built-in, one-time extension that is planned for in advance",
 "若仍未收斂：": "If still unresolved: ",
 "正式與 DMP 溝通並進行後續決策": "we formally communicate with DMP and make the follow-up decision",
 "若決定再次延長：": "If we decide to extend again: ",
 "與 DMP 正式確認並留下紀錄": "it is formally confirmed with DMP and recorded",
 "若如期發行：": "If we release on schedule: ",
 "發行前與 DMP 溝通，並明確說明已知風險": "we communicate with DMP before release and clearly explain the known risks",
 "版本節奏與彈性機制": "Release Rhythm & Flexibility",
 "版本銜接不中斷，時程也保留可預期的彈性空間": "Releases stay continuous, and the schedule keeps predictable room for flexibility",
 "版本接續：每一版皆為完整 7 週": "Release continuity: every release is a full 7 weeks",
 "條件式 +1 週彈性機制": "Conditional +1 week flexibility",
 "安全閥：不會無限期延遲": "Safety valve: no open-ended delays",
 "iCatch 測項規劃": "iCatch Test Item Planning",
 "我們的承諾": "Our Commitments",
 "客戶協作重點": "Customer Collaboration Highlights",
 "謝謝": "Thank You",
 "按右鍵開啟工具選單": "Right-click to open the tool menu",
 "品質提升方案": "Quality Improvement Program",
 "重新調整了 SDK release 的驗證流程與協作方式": "Restructured the SDK release validation process and the way we collaborate",
 "主講者：": "Presenter: ",
 "作者：": "Author: ",
 "2026年10月": "October 2026",
 "🖊️ 螢光筆": "🖊️ Highlighter",
 "🧹 橡皮擦": "🧹 Eraser",
 "🔴 雷射筆": "🔴 Laser pointer",
 "✕ 清空標記": "✕ Clear marks",
 "Alpha 切出後，立即啟動長時間驗證": "Start long-duration validation immediately after the Alpha cut",
 "以 DMP 實際使用情境提前驗證，降低版本交付後才發現問題的機率。": "Validate early against DMP's real usage scenarios, reducing the chance that issues are only found after the release is delivered.",
 "Alpha 切出後即啟動長時間穩定性驗證": "Long-duration stability validation starts right after the Alpha cut",
 "Beta 發行前完成必要驗證與複測": "Required validation and retests are completed before the Beta release",
 "以 DMP 標準重新檢視測項": "Review our existing test items against DMP's test items",
 "從測試覆蓋延伸到測試深度。": "Extending from test coverage to test depth.",
 "比對 DMP 測項與 iCatch 現有測項": "Compare DMP's test items with the existing iCatch test items",
 "依比對結果檢視測試深度與驗證範圍": "Review test depth and validation scope based on the comparison",
 "持續補強驗證的完整性與嚴謹度": "Continuously strengthen the completeness and rigor of validation",
 "問題轉化為長期迴歸測試": "Turn every issue into a long-term regression test",
 "修復不是終點，問題會沉澱為後續版本的驗證能力。": "A fix is not the finish line: every issue becomes part of our validation capability for future releases.",
 "每次問題修復後，納入後續版本的迴歸測試": "After each fix, add it to the regression tests of later releases",
 "持續累積自動化驗證項目": "Continue expanding our automated validation coverage",
 "降低同類問題再次發生的機會": "Reduce the chance of the same class of issue happening again",
 "正式發行前，設置明確品質關卡": "Set clear quality gates before the official release",
 "重大問題的處理與發行決定，都會事先與 DMP 溝通。": "Decisions about major issues and the release are always discussed with DMP in advance.",
 "正式發行前執行最終確認": "Run a final confirmation before the official release",
 "若仍有 Critical 問題未解決，提前與 DMP 溝通，並依雙方共識調整正式發行時間，或如期發行並說明已知風險": "If any Critical issue remains unresolved, we will communicate with DMP early and, by mutual agreement, either adjust the official release date or release on schedule with the known risks explained.",
 "期待 DMP 協作": "Looking Forward to Collaborating with DMP",
 "DMP 測項": "DMP Test Items",
 "DMP 測項列為每版 Release 的必要驗證關卡。": "DMP's test items are a mandatory validation gate for every release.",
 "DMP 提供完整驗收測試腳本": "DMP provides the complete acceptance test scripts",
 "每版依驗收測項執行驗證": "Each release is validated against the acceptance test items",
 "驗收測項完成並通過後，進入下一階段驗證": "Once the acceptance items are completed and passed, we move on to the next validation stage",
 "測試項目回歸": "Test Item Regression",
 "DMP 回饋的問題，轉化為後續版本的長期驗證能力。": "Issues reported by DMP become part of our long-term validation for future releases.",
 "問題修復後納入自動化迴歸測試": "Fixed issues are added to the automated regression tests",
 "後續版本持續執行與驗證": "Continuously validated in subsequent releases",
 "新增測項於 Week 7 提出，納入下一版規劃": "New test items are proposed in Week 7 and included in the next release plan",
 "DMP 測項驗證：iCatch 預留一週": "DMP test item validation: iCatch reserves one week",
 "W3 預留完整一週，專門執行 DMP 提供的測項。": "W3 is reserved as a full week dedicated to running the test items provided by DMP.",
 "依 DMP 提供的測項逐項執行驗證": "Validate item by item against the test items provided by DMP",
 "發現問題後進行分析、修復與複測": "When an issue is found, analyze, fix and retest",
 "W3 完成 DMP 測項驗證，作為後續 Beta 發行前的確認依據": "DMP test item validation is completed in W3 and serves as the confirmation basis before the Beta release",
 "問題與討論": "Questions & Discussion",
 "歡迎針對 Release 流程、驗證方式與後續合作方式交流。": "You are welcome to discuss the release process, validation methods and how we work together going forward.",
 "調整方向 ／ RELEASE 週期": "Direction / RELEASE Cycle",
 "從「能運作」到「長時間穩定運作」": "From “It Works” to “It Keeps Working Reliably Over Time”",
 "版本發行與測項改善計畫": "Release & Test Item Improvement Plan",
 "調整方向": "Adjustment Direction",
 "從「功能驗證」走向「穩定度驗證」": "From “Functional Validation” to “Stability Validation”",
 "11.4.2 以前：": "Before 11.4.2: ",
 "以功能驗證為主，確認各項功能是否正常運作。": "Validation focused on functionality, confirming that each feature works correctly.",
 "隨著 SDK 持續演進：": "As the SDK keeps evolving: ",
 "新功能與使用情境持續增加，Release 驗證也需要涵蓋更完整的運行情境。": "New features and usage scenarios keep growing, so release validation must cover more complete operating scenarios.",
 "近期驗證經驗：": "Recent validation experience: ",
 "長時間運行、穩定度與邊界情境的重要性更加明顯。": "The importance of long-duration operation, stability and edge cases has become clearer.",
 "因此，我們進一步將長時間與穩定度驗證納入 Release 的重要驗證環節。": "We have therefore made long-duration and stability validation a key part of release validation.",
 "對應 DMP 測項": "Aligned with DMP Test Items",
 "Release 週期由 6 週調整為 7 週。": "The release cycle is extended from 6 weeks to 7 weeks.",
 "為什麼要多一週": "Why one more week",
 "完成長時間穩定性驗證": "Complete long-duration stability validation",
 "優先完成 DMP 測項驗證": "Complete DMP test item validation first",
 "保留整合與問題修正時間": "Reserve time for integration and issue fixing",
 "內部 Review": "Internal Review",
 "全面檢視 iCatch 既有測項的設計邏輯與涵蓋深度，強化測試完整性與驗證覆蓋，降低潛在風險。": "A full review of the design logic and coverage depth of the existing iCatch test items, strengthening test completeness and validation coverage to reduce potential risk.",
 "7 週標準流程": "7-Week Standard Process",
 "新功能開發與除錯": "New Feature Development",
 "目的：完成新功能驗證。": "Goal: complete new feature validation.",
 "研發持續進行新功能開發，除錯測試團隊同步跟進，逐項確認新功能": "R&D continues developing new features while the test team follows debugging closely and confirms each new feature",
 "測試團隊每兩天定期確定基本功能": "The test team checks basic functionality every two days",
 "開發與測試並行，及早發現並修正問題": "Development and testing run in parallel to find and fix issues early",
 "W2 週五": "W2 Fri",
 "Alpha 切出": "Alpha Cut",
 "目的：鎖定版本範圍，建立穩定的驗證基準。": "Goal: lock the release scope and establish a stable validation baseline.",
 "週五切出 Alpha": "Alpha is cut on Friday",
 "code 凍結範圍鎖定，後續以重大問題修復為主": "Code is frozen and scope is locked; from here on the focus is critical issue fixing",
 "介面與功能規格固定，確保後續驗證結果與最終交付版本一致": "Interfaces and feature specifications are frozen so later validation results match the final delivered release",
 "優先驗證 DMP 測項": "Priority Validation: DMP Test Items",
 "目的：優先確認交付重點與高風險項目。": "Goal: confirm the delivery priorities and high-risk items first.",
 "DMP提供的測項列為必要驗證關卡": "The test items provided by DMP are a mandatory validation gate",
 "新功能同步驗證，與 DMP 測項並行": "New features are validated alongside the DMP test items",
 "長時間可靠度測試同步啟動": "Long-duration reliability testing starts at the same time",
 "iCatch 自身測項": "iCatch Internal Test Items",
 "目的：擴大驗證範圍，確認長時間運行穩定性。": "Goal: broaden validation scope and confirm long-duration operating stability.",
 "執行 iCatch 自身測項": "Run the iCatch internal test items",
 "涵蓋多種操作情境與長時間運行": "Covering multiple operating scenarios and long-duration runs",
 "保留充足驗證時間，及早發現整合過程中的連帶問題": "Reserve sufficient validation time to identify issues that may arise during integration",
 "Beta 發行（W5 週五）": "Beta Release (W5 Fri)",
 "目的：完成最後修復與 DMP 測項複驗，週五作為 Beta 最晚發行期限。": "Goal: complete the final fixes and re-verify the DMP test items; Friday is the latest deadline for the Beta release.",
 "週一～週四：問題修復、複測，並再次執行 DMP 測項確認": "Mon–Thu: fix issues, retest, and re-run the DMP test items for final confirmation",
 "週三：中途檢查點；若有重大問題無法如期解決，提前與 DMP 溝通": "Wed: midpoint checkpoint; if a major issue cannot be resolved on time, we will communicate with DMP early",
 "週五：發行 Beta；若仍有非必要項目未完成，主動說明驗證涵蓋範圍": "Fri: release the Beta; if any non-essential items remain incomplete, we proactively explain the validation scope covered",
 "客戶整合驗證": "Customer Integration",
 "目的：確認實際整合情境，雙方同步處理問題。": "Goal: confirm real integration scenarios, with both sides handling issues in parallel.",
 "DMP：進行程式碼銜接與整合測試": "DMP: integrate the code and run integration tests",
 "iCatch：同步協助問題分析與修復": "iCatch: help analyze and fix issues in parallel",
 "週四：中途檢查點，提前跟 DMP 確認是否需要調整正式發行時間": "Thu: midpoint checkpoint to confirm with DMP early whether the official release date needs adjusting",
 "確認正式發行": "Confirm Official Release",
 "目的：完成雙方最終確認，確認版本符合正式發行條件。": "Goal: complete final confirmation with both sides and verify that the release meets the official release criteria.",
 "週一～週二：驗證 DMP 整合部分": "Mon–Tue: validate the DMP integration part",
 "週三～週四：Confirmation Test，雙方進行最終確認": "Wed–Thu: Confirmation Test, final confirmation by both sides",
 "週五：正式版本發行": "Fri: official release",
 "同步提交下一版新增測項需求": "Submit new test item requests for the next release at the same time",
 "測項規劃": "Test Item Planning",
 "DMP 測項 × iCatch 測項": "DMP Test Items × iCatch Test Items",
 "目的：以 DMP 實際測試標準，重新檢視 iCatch 現有測項的完整性與深度。": "Goal: re-examine the completeness and depth of the existing iCatch test items based on DMP's actual test criteria.",
 "iCatch 測項": "iCatch Test Items",
 "交集": "Overlap",
 "比對 DMP 與 iCatch 現有測項，確認測試覆蓋範圍": "Compare the existing DMP and iCatch test items to confirm test coverage",
 "從「有沒有測」進一步深入檢視「測得夠不夠深入」": "Go beyond “is it tested” to a thorough review of “is it tested deeply enough”",
 "依比對結果訂定測試深度標準": "Define test depth standards based on the comparison results",
 "加速自動化驗證功能的建置，提升驗證效率": "Accelerate the build-out of automated validation to improve validation efficiency",
 "iCatCv 測項規劃": "iCatCv Test Item Planning",
 "iCatCv 測試項目與驗證範圍規劃中。": "iCatCv test items and validation scope are being planned.",
 "提供完整 iCatCv Full Test Item 流程": "Provide the complete iCatCv Full Test Item flow",
 "提供文件，明確說明 Full Test Item 的使用方式": "Provide documentation that clearly explains how to use Full Test Item",
 "將 iCatCv Full Test 納入 QA 標準測試項目": "Include iCatCv Full Test in the standard QA test items",
 "後續 Release 持續執行並驗證": "Keep running and validating it in later releases",
 "上一週": "Previous week",
 "下一週": "Next week",
 "展開細節": "Show details",
 "現行 6 週標準流程": "Current 6-Week Standard Process",
 "Branch 切出後，QA 測試與 RD 新增功能並行；W3 週五出 Beta，W4 由 DMP merge code，W6 release。其中 RD 修復與 QA 測試同時進行，是現行流程的問題所在。": "After the branch is cut, QA testing and RD feature development run in parallel; Beta is released on W3 Friday, DMP merges code in W4, and the release goes out in W6. RD fixing and QA testing happen at the same time, which is the problem with the current process.",
 "功能開發": "Feature Development",
 "RD 問題修復": "RD: Issue Fixing",
 "點選色帶或里程碑，可展開該週說明": "Click a bar or milestone to expand that week's details",
 "Branch 切出（W1 週一）": "Branch cut (W1 Mon)",
 "修復與測試同時進行": "Fixing and testing run at the same time",
 "QA 持續測試": "QA Continuous Testing",
 "Beta 版本（W3 週五）": "Beta release (W3 Fri)",
 "圖面為現行流程示意；RD 修復與 QA 測試的重疊範圍為 W1～W5，週內日期僅 W1 週一（Branch 切出）與 W3 週五（Beta）有明確指定。": "The chart illustrates the current process; within a week, RD fixing and QA testing overlap across W1–W5, and only W1 Monday (branch cut) and W3 Friday (Beta) are specified dates.",
 "新 7 週標準流程時間軸": "New 7-Week Standard Process Timeline",
 "7 週時間軸": "7-Week Timeline",
 "W2 週五切出 Alpha 後鎖定範圍；W5 週五為 Beta 最晚發行期限；W7 週五正式發行。": "Scope is locked after the Alpha cut on W2 Friday; W5 Friday is the latest Beta date; the official release is on W7 Friday.",
 "重大問題修復與長時間可靠度測試同步啟動": "Critical issue fixing and long-duration reliability testing start together",
 "每項修正皆說明影響範圍，並測試相關測項": "Every fix states its impact scope, and the related test items are tested",
 "每兩天定期確定基本功能與新功能驗證": "Basic checks every 2 days + new feature validation",
 "協助問題分析與修復": "Support issue fixing",
 "新功能驗證": "New feature validation",
 "DMP 測項優先驗證": "DMP test items first",
 "DMP 測項複驗": "DMP test items re-check",
 "Alpha 切出（W2 週五）": "Alpha cut (W2 Fri)",
 "Beta 最晚發行（W5 週五）": "Latest Beta (W5 Fri)",
 "正式發行（W7 週五）": "Official release (W7 Fri)",
 "檢查點（W5 週三）": "Check-in (W5 Wed)",
 "檢查點（W6 週四）": "Check-in (W6 Thu)",
 "程式碼銜接與整合測試": "Integration test",
 "圖面依 7 週標準流程繪製；灰色為研發修復，彩色為驗證（顏色對應各週）；週內日期以各週說明為準。": "Drawn from the 7-week standard process: gray bars are R&D fixing, colored bars are validation (colors match each week); in-week dates follow each week's description.",
 "工具選單": "Tool menu"
};

  const JA = {
 "新 7 週標準流程時間軸": "新 7 週間の標準プロセス：タイムライン",
 "7 週時間軸": "7 週間タイムライン",
 "W2 週五切出 Alpha 後鎖定範圍；W5 週五為 Beta 最晚發行期限；W7 週五正式發行。": "W2 金曜の Alpha 作成後に範囲を固定し、W5 金曜が Beta の最終期限、W7 金曜に正式リリースします。",
 "重大問題修復與長時間可靠度測試同步啟動": "重大な問題の修正と長時間の信頼性テストを同時に開始",
 "每項修正皆說明影響範圍，並測試相關測項": "すべての修正で影響範囲を説明し、関連するテスト項目をテストします",
 "每兩天定期確定基本功能與新功能驗證": "2 日ごとの基本機能の確認と新機能の検証",
 "協助問題分析與修復": "問題修正を支援",
 "新功能驗證": "新機能の検証",
 "DMP 測項優先驗證": "DMP テスト項目を優先検証",
 "DMP 測項複驗": "DMP テスト項目の再検証",
 "Alpha 切出（W2 週五）": "Alpha 作成（W2 金曜）",
 "Beta 最晚發行（W5 週五）": "Beta 最終期限（W5 金曜）",
 "正式發行（W7 週五）": "正式リリース（W7 金曜）",
 "檢查點（W5 週三）": "確認（W5 水曜）",
 "檢查點（W6 週四）": "確認（W6 木曜）",
 "程式碼銜接與整合測試": "統合テスト",
 "圖面依 7 週標準流程繪製；灰色為研發修復，彩色為驗證（顏色對應各週）；週內日期以各週說明為準。": "7 週間の標準プロセスに基づく図です。灰色は R&D の修正、色付きは検証（色は各週に対応）。週内の日付は各週の説明に従います。",
 "現行 6 週標準流程": "現行の 6 週間標準プロセス",
 "Branch 切出後，QA 測試與 RD 新增功能並行；W3 週五出 Beta，W4 由 DMP merge code，W6 release。其中 RD 修復與 QA 測試同時進行，是現行流程的問題所在。": "ブランチ作成後、QA テストと RD の新機能開発を並行して進めます。W3 金曜に Beta をリリースし、W4 に DMP がコードをマージ、W6 にリリースします。RD の修正と QA テストが同時に進むことが、現行プロセスの課題です。",
 "功能開發": "機能開発",
 "RD 問題修復": "RD：問題の修正",
 "點選色帶或里程碑，可展開該週說明": "バーやマイルストーンをクリックすると、その週の詳細を表示します",
 "Branch 切出（W1 週一）": "ブランチ作成（W1 月曜）",
 "修復與測試同時進行": "修正とテストが同時進行",
 "QA 持續測試": "QA 継続テスト",
 "Beta 版本（W3 週五）": "Beta 版（W3 金曜）",
 "圖面為現行流程示意；RD 修復與 QA 測試的重疊範圍為 W1～W5，週內日期僅 W1 週一（Branch 切出）與 W3 週五（Beta）有明確指定。": "この図は現行プロセスの概念図です。RD 修正と QA テストは W1～W5 にわたって重なっており、週内の日付で明示されているのは W1 月曜（ブランチ作成）と W3 金曜（Beta）のみです。",
 "SDK Release 品質提升方案": "SDK リリース品質向上プログラム",
 "封面": "表紙",
 "N 與 N+1 疊接進行，前一版驗證與下一版開發並行，版本銜接不中斷。": "N 版と N+1 版を重ねて進めます。前のリリースの検証と次のリリースの開発を並行させ、リリースが途切れません。",
 "每一版皆依相同流程執行完整 7 週": "すべてのリリースが同じプロセスで、完全な 7 週間を実施します",
 "N+1 可提前啟動開發，但不壓縮其自身的 7 週驗證週期": "N+1 版は開発を前倒しで開始できますが、自身の 7 週間の検証期間は短縮しません",
 "7 週為標準週期，遇到重大問題時保留一次彈性延長。": "7 週間が標準サイクルです。重大な問題が発生した場合に備え、1 回限りの柔軟な延長の余地を残します。",
 "出現 Critical 問題，且無法於原定週期內收斂": "Critical の問題が発生し、当初のサイクル内で収束できない場合",
 "提前與 DMP 溝通，確認是否啟動 +1 週": "DMP と早めに協議し、+1 週間を発動するか確認します",
 "延長 1 週，提供完整問題修復與驗證時間": "1 週間延長し、問題修正と検証に十分な時間を確保します",
 "延長有上限，不會無限期延後。": "延長には上限があり、スケジュールが際限なく延びることはありません。",
 "7 週 → 8 週：": "7 週間 → 8 週間：",
 "機制內建的一次性延長，提前納入規劃": "あらかじめ組み込まれた 1 回限りの延長で、事前に計画に織り込みます",
 "若仍未收斂：": "それでも収束しない場合：",
 "正式與 DMP 溝通並進行後續決策": "DMP と正式に協議し、その後の判断を行います",
 "若決定再次延長：": "再度の延長を決めた場合：",
 "與 DMP 正式確認並留下紀錄": "DMP と正式に確認し、記録を残します",
 "若如期發行：": "予定どおりリリースする場合：",
 "發行前與 DMP 溝通，並明確說明已知風險": "リリース前に DMP と協議し、既知のリスクを明確に説明します",
 "版本節奏與彈性機制": "リリースのリズムと柔軟性の仕組み",
 "版本銜接不中斷，時程也保留可預期的彈性空間": "リリースは途切れることなく続き、スケジュールにも予測可能な柔軟性を残します",
 "版本接續：每一版皆為完整 7 週": "リリースの接続：すべてのリリースが完全な 7 週間",
 "條件式 +1 週彈性機制": "条件付き +1 週間の柔軟な仕組み",
 "安全閥：不會無限期延遲": "セーフティバルブ：無期限の遅延は起こしません",
 "iCatch 測項規劃": "iCatch テスト項目の計画",
 "我們的承諾": "私たちのお約束",
 "客戶協作重點": "お客様との協業ポイント",
 "謝謝": "ありがとうございました",
 "按右鍵開啟工具選單": "右クリックでツールメニューを開く",
 "品質提升方案": "品質向上プログラム",
 "重新調整了 SDK release 的驗證流程與協作方式": "SDK リリースの検証プロセスと協業のあり方を見直しました",
 "主講者：": "発表者：",
 "作者：": "作成者：",
 "2026年10月": "2026年10月",
 "🖊️ 螢光筆": "🖊️ 蛍光ペン",
 "🧹 橡皮擦": "🧹 消しゴム",
 "🔴 雷射筆": "🔴 レーザーポインター",
 "✕ 清空標記": "✕ マークを消去",
 "Alpha 切出後，立即啟動長時間驗證": "Alpha 切り出し直後に長時間検証を開始します",
 "以 DMP 實際使用情境提前驗證，降低版本交付後才發現問題的機率。": "DMP の実際の利用シナリオで早期に検証し、納品後に問題が見つかる可能性を下げます。",
 "Alpha 切出後即啟動長時間穩定性驗證": "Alpha 切り出し後すぐに長時間の安定性検証を開始します",
 "Beta 發行前完成必要驗證與複測": "Beta 発行前に必要な検証と再テストを完了します",
 "以 DMP 標準重新檢視測項": "DMP のテスト項目と照らして当社のテスト項目を見直します",
 "從測試覆蓋延伸到測試深度。": "テストの網羅性から、テストの深さへ広げます。",
 "比對 DMP 測項與 iCatch 現有測項": "DMP のテスト項目と iCatch の既存テスト項目を比較します",
 "依比對結果檢視測試深度與驗證範圍": "比較結果に基づき、テストの深さと検証範囲を見直します",
 "持續補強驗證的完整性與嚴謹度": "検証の網羅性と厳密さを継続的に強化します",
 "問題轉化為長期迴歸測試": "発生した問題を長期的な回帰テストに変えます",
 "修復不是終點，問題會沉澱為後續版本的驗證能力。": "修正はゴールではありません。問題は今後のリリースの検証力として蓄積されます。",
 "每次問題修復後，納入後續版本的迴歸測試": "問題を修正するたびに、以降のリリースの回帰テストに組み込みます",
 "持續累積自動化驗證項目": "自動化された検証項目を継続的に拡充します",
 "降低同類問題再次發生的機會": "同種の問題が再発する可能性を下げます",
 "正式發行前，設置明確品質關卡": "正式リリース前に明確な品質ゲートを設けます",
 "重大問題的處理與發行決定，都會事先與 DMP 溝通。": "重大な問題への対応とリリースの判断は、事前に必ず DMP と協議します。",
 "正式發行前執行最終確認": "正式リリース前に最終確認を実施します",
 "若仍有 Critical 問題未解決，提前與 DMP 溝通，並依雙方共識調整正式發行時間，或如期發行並說明已知風險": "Critical の問題が未解決の場合は、早めに DMP にご相談のうえ、双方の合意に基づき、正式リリース日を調整するか、既知のリスクを説明したうえで予定どおりリリースします。",
 "期待 DMP 協作": "DMP との協業への期待",
 "DMP 測項": "DMP テスト項目",
 "DMP 測項列為每版 Release 的必要驗證關卡。": "DMP のテスト項目は、毎回のリリースで必須の検証ゲートです。",
 "DMP 提供完整驗收測試腳本": "DMP に受け入れテストスクリプト一式をご提供いただきます",
 "每版依驗收測項執行驗證": "リリースごとに受け入れテスト項目で検証します",
 "驗收測項完成並通過後，進入下一階段驗證": "受け入れテスト項目が完了し合格した後、次の検証段階へ進みます",
 "測試項目回歸": "テスト項目の回帰",
 "DMP 回饋的問題，轉化為後續版本的長期驗證能力。": "DMP からご指摘いただいた問題は、今後のリリースの長期的な検証力になります。",
 "問題修復後納入自動化迴歸測試": "修正した問題は自動化された回帰テストに組み込みます",
 "後續版本持續執行與驗證": "以降のリリースで継続的に実行・検証します",
 "新增測項於 Week 7 提出，納入下一版規劃": "新規テスト項目は Week 7 にご提案いただき、次のリリース計画に反映します",
 "DMP 測項驗證：iCatch 預留一週": "DMP テスト項目の検証：iCatch が 1 週間を確保",
 "W3 預留完整一週，專門執行 DMP 提供的測項。": "W3 に丸 1 週間を確保し、DMP にご提供いただくテスト項目の実施に専念します。",
 "依 DMP 提供的測項逐項執行驗證": "DMP にご提供いただくテスト項目を 1 つずつ検証します",
 "發現問題後進行分析、修復與複測": "問題が見つかった場合は、分析・修正・再テストを行います",
 "W3 完成 DMP 測項驗證，作為後續 Beta 發行前的確認依據": "W3 で DMP テスト項目の検証を完了し、Beta 発行前の確認の根拠とします",
 "問題與討論": "質疑応答・ディスカッション",
 "歡迎針對 Release 流程、驗證方式與後續合作方式交流。": "リリースプロセス、検証方法、今後の協業の進め方について、お気軽にご意見をお寄せください。",
 "調整方向 ／ RELEASE 週期": "見直しの方向性 ／ RELEASE サイクル",
 "從「能運作」到「長時間穩定運作」": "「動く」から「長時間安定して動く」へ",
 "版本發行與測項改善計畫": "リリースとテスト項目の改善計画",
 "調整方向": "見直しの方向性",
 "從「功能驗證」走向「穩定度驗證」": "「機能検証」から「安定性検証」へ",
 "11.4.2 以前：": "11.4.2 以前：",
 "以功能驗證為主，確認各項功能是否正常運作。": "機能検証が中心で、各機能が正しく動作するかを確認していました。",
 "隨著 SDK 持續演進：": "SDK の進化に伴い：",
 "新功能與使用情境持續增加，Release 驗證也需要涵蓋更完整的運行情境。": "新機能と利用シナリオが増え続けており、リリース検証もより網羅的な動作シナリオをカバーする必要があります。",
 "近期驗證經驗：": "最近の検証で得た知見：",
 "長時間運行、穩定度與邊界情境的重要性更加明顯。": "長時間動作、安定性、境界条件の重要性がいっそう明らかになりました。",
 "因此，我們進一步將長時間與穩定度驗證納入 Release 的重要驗證環節。": "そこで、長時間検証と安定性検証を、リリース検証の重要な工程として組み込みました。",
 "對應 DMP 測項": "DMP テスト項目への対応",
 "Release 週期由 6 週調整為 7 週。": "リリースサイクルを 6 週間から 7 週間に変更します。",
 "為什麼要多一週": "なぜ 1 週間延ばすのか",
 "完成長時間穩定性驗證": "長時間の安定性検証を完了する",
 "優先完成 DMP 測項驗證": "DMP テスト項目の検証を優先して完了する",
 "保留整合與問題修正時間": "統合と問題修正のための時間を確保する",
 "內部 Review": "社内レビュー",
 "全面檢視 iCatch 既有測項的設計邏輯與涵蓋深度，強化測試完整性與驗證覆蓋，降低潛在風險。": "iCatch の既存テスト項目について、設計の考え方とカバー範囲の深さを全面的に見直し、テストの網羅性と検証カバレッジを強化して潜在的なリスクを低減します。",
 "7 週標準流程": "7 週間の標準プロセス",
 "新功能開發與除錯": "新機能の開発とデバッグ",
 "目的：完成新功能驗證。": "目的：新機能の検証を完了します。",
 "研發持續進行新功能開發，除錯測試團隊同步跟進，逐項確認新功能": "開発チームが新機能の開発を続け、テストチームがデバッグに並行して対応し、新機能を一つずつ確認します",
 "測試團隊每兩天定期確定基本功能": "テストチームが 2 日ごとに基本機能を確認します",
 "開發與測試並行，及早發現並修正問題": "開発とテストを並行して進め、問題を早期に発見して修正します",
 "W2 週五": "W2 金",
 "Alpha 切出": "Alpha 切り出し",
 "目的：鎖定版本範圍，建立穩定的驗證基準。": "目的：リリース範囲を確定し、安定した検証基準を作ります。",
 "週五切出 Alpha": "金曜日に Alpha を切り出します",
 "code 凍結範圍鎖定，後續以重大問題修復為主": "コードをフリーズして範囲を固定し、以降は重大な問題の修正を中心に進めます",
 "介面與功能規格固定，確保後續驗證結果與最終交付版本一致": "インターフェースと機能仕様を固定し、以降の検証結果が最終納品版と一致するようにします",
 "優先驗證 DMP 測項": "DMP テスト項目の優先検証",
 "目的：優先確認交付重點與高風險項目。": "目的：納品の重点項目とリスクの高い項目を優先して確認します。",
 "DMP提供的測項列為必要驗證關卡": "DMP にご提供いただくテスト項目を必須の検証ゲートとします",
 "新功能同步驗證，與 DMP 測項並行": "新機能の検証を DMP テスト項目と並行して行います",
 "長時間可靠度測試同步啟動": "長時間の信頼性テストを同時に開始します",
 "iCatch 自身測項": "iCatch 社内テスト項目",
 "目的：擴大驗證範圍，確認長時間運行穩定性。": "目的：検証範囲を広げ、長時間動作の安定性を確認します。",
 "執行 iCatch 自身測項": "iCatch の社内テスト項目を実施します",
 "涵蓋多種操作情境與長時間運行": "さまざまな操作シナリオと長時間動作をカバーします",
 "保留充足驗證時間，及早發現整合過程中的連帶問題": "十分な検証時間を確保し、統合の過程で生じうる問題を早期に洗い出します",
 "Beta 發行（W5 週五）": "Beta 発行（W5 金曜）",
 "目的：完成最後修復與 DMP 測項複驗，週五作為 Beta 最晚發行期限。": "目的：最終修正と DMP テスト項目の再検証を完了します。金曜日が Beta 発行の最終期限です。",
 "週一～週四：問題修復、複測，並再次執行 DMP 測項確認": "月〜木：問題の修正と再テストを行い、DMP テスト項目を再実行して最終確認します",
 "週三：中途檢查點；若有重大問題無法如期解決，提前與 DMP 溝通": "水：中間チェックポイント。重大な問題が期限内に解決できない場合は、早めに DMP にご相談します",
 "週五：發行 Beta；若仍有非必要項目未完成，主動說明驗證涵蓋範圍": "金：Beta を発行します。必須ではない項目が未完了の場合は、検証のカバー範囲をこちらからご説明します",
 "客戶整合驗證": "お客様側の統合検証",
 "目的：確認實際整合情境，雙方同步處理問題。": "目的：実際の統合シナリオを確認し、双方で並行して問題に対応します。",
 "DMP：進行程式碼銜接與整合測試": "DMP：コードを統合し、統合テストを実施します",
 "iCatch：同步協助問題分析與修復": "iCatch：問題の分析と修正を並行して支援します",
 "週四：中途檢查點，提前跟 DMP 確認是否需要調整正式發行時間": "木：中間チェックポイント。正式リリース日の調整が必要かを DMP と早めに確認します",
 "確認正式發行": "正式リリースの確認",
 "目的：完成雙方最終確認，確認版本符合正式發行條件。": "目的：双方で最終確認を完了し、リリースが正式リリースの条件を満たしていることを確認します。",
 "週一～週二：驗證 DMP 整合部分": "月〜火：DMP 統合部分を検証します",
 "週三～週四：Confirmation Test，雙方進行最終確認": "水〜木：Confirmation Test。双方で最終確認を行います",
 "週五：正式版本發行": "金：正式版をリリースします",
 "同步提交下一版新增測項需求": "あわせて、次のリリースで追加するテスト項目のご要望をご提出いただきます",
 "測項規劃": "テスト項目の計画",
 "DMP 測項 × iCatch 測項": "DMP テスト項目 × iCatch テスト項目",
 "目的：以 DMP 實際測試標準，重新檢視 iCatch 現有測項的完整性與深度。": "目的：DMP の実際のテスト基準に基づき、iCatch の既存テスト項目の網羅性と深さを見直します。",
 "iCatch 測項": "iCatch テスト項目",
 "交集": "重なり",
 "比對 DMP 與 iCatch 現有測項，確認測試覆蓋範圍": "DMP と iCatch の既存テスト項目を比較し、テストの網羅範囲を確認します",
 "從「有沒有測」進一步深入檢視「測得夠不夠深入」": "「テストしているか」から「十分に掘り下げてテストできているか」まで踏み込んで見直します",
 "依比對結果訂定測試深度標準": "比較結果に基づき、テストの深さの基準を定めます",
 "加速自動化驗證功能的建置，提升驗證效率": "自動化検証機能の整備を加速し、検証の効率を高めます",
 "iCatCv 測項規劃": "iCatCv テスト項目の計画",
 "iCatCv 測試項目與驗證範圍規劃中。": "iCatCv のテスト項目と検証範囲は計画中です。",
 "提供完整 iCatCv Full Test Item 流程": "iCatCv Full Test Item の完全なフローを提供する",
 "提供文件，明確說明 Full Test Item 的使用方式": "Full Test Item の使い方を明確に説明するドキュメントを提供する",
 "將 iCatCv Full Test 納入 QA 標準測試項目": "iCatCv Full Test を QA の標準テスト項目に組み込む",
 "後續 Release 持續執行並驗證": "以降のリリースでも継続して実行・検証する",
 "上一週": "前の週",
 "下一週": "次の週",
 "展開細節": "詳細を表示",
 "工具選單": "ツールメニュー"
};

  const DICT = { en: EN, ja: JA };
  const HTML_LANG = { zh: 'zh-Hant', en: 'en', ja: 'ja' };

  // 含動態數字／組合字串的規則（page4 週次標題）
  const RULES = {
    en(s){
      let m;
      if((m = s.match(/^週次 (\d+) \/ (\d+)$/))) return 'Week ' + m[1] + ' / ' + m[2];
      if((m = s.match(/^(W\d+(?: W\d+)?)( 週五)?\u3000(.+)$/))){
        const t = EN[m[3]];
        if(t) return m[1] + (m[2] ? ' Fri' : '') + '  ' + t;
      }
      return null;
    },
    ja(s){
      let m;
      if((m = s.match(/^週次 (\d+) \/ (\d+)$/))) return '第' + m[1] + '週 / ' + m[2];
      if((m = s.match(/^(W\d+(?: W\d+)?)( 週五)?\u3000(.+)$/))){
        const t = JA[m[3]];
        if(t) return m[1] + (m[2] ? ' 金' : '') + '  ' + t;
      }
      return null;
    }
  };

  const CJK = /[\u3000-\u9fff\uff00-\uffef]/;
  const origText = new WeakMap();   // text node -> 原中文 nodeValue
  const origAttr = new WeakMap();   // element -> {attr: 原中文}
  let lang = 'zh';
  let observer = null;

  function isLang(v){ return v === 'zh' || v === 'en' || v === 'ja'; }

  function getLang(){
    try{
      const q = new URLSearchParams(location.search).get('lang');
      if(isLang(q)) return q;
    }catch(_){}
    try{
      const s = localStorage.getItem('deckLang');
      if(isLang(s)) return s;
    }catch(_){}
    return 'zh';
  }

  // 由「中文原文」翻成目前語言；查不到回傳 null
  function trText(raw, l){
    const lead = raw.match(/^\s*/)[0], trail = raw.match(/\s*$/)[0];
    const core = raw.trim();
    const d = DICT[l];
    const hit = d[core] !== undefined ? d[core] : RULES[l](core);
    return hit === null || hit === undefined ? null : lead + hit + trail;
  }

  // 翻譯單一文字節點：一律以「原中文」為來源，所以 en <-> ja 可直接互切
  function toLangNode(n){
    const has = origText.has(n);
    const base = has ? origText.get(n) : n.nodeValue;
    if(!base || !CJK.test(base)) return;
    const r = trText(base, lang);
    if(r === null){
      if(has && n.nodeValue !== base) n.nodeValue = base;   // 沒有對照就退回中文
      return;
    }
    if(!has) origText.set(n, base);
    if(n.nodeValue !== r) n.nodeValue = r;                  // 值相同不寫，避免觸發 observer 迴圈
  }

  function toLangAttrs(el){
    ['title','alt'].forEach(a=>{
      let o = origAttr.get(el);
      const cur = el.getAttribute && el.getAttribute(a);
      const base = o && (a in o) ? o[a] : cur;
      if(!base || !CJK.test(base)) return;
      const t = DICT[lang][base];
      if(t === undefined) return;
      if(!o){ o = {}; origAttr.set(el, o); }
      if(!(a in o)) o[a] = base;
      if(cur !== t) el.setAttribute(a, t);
    });
  }

  const SKIP = {acceptNode(n){
    const p = n.parentNode && n.parentNode.nodeName;
    return (p === 'SCRIPT' || p === 'STYLE') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
  }};
  function walk(root, fn, attrFn){
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, SKIP);
    const nodes = []; let n;
    while((n = w.nextNode())) nodes.push(n);
    nodes.forEach(fn);
    if(root.nodeType === 1){
      if(attrFn) attrFn(root);
      root.querySelectorAll('[title],[alt]').forEach(attrFn);
    }
  }

  function startObserver(){
    if(observer) return;
    observer = new MutationObserver(muts=>{
      if(lang === 'zh') return;
      muts.forEach(m=>{
        if(m.type === 'characterData') toLangNode(m.target);
        m.addedNodes.forEach(a=>{
          if(a.nodeType === 3) toLangNode(a);
          else if(a.nodeType === 1) walk(a, toLangNode, toLangAttrs);
        });
      });
    });
    observer.observe(document.documentElement, {childList:true, subtree:true, characterData:true});
  }

  function applyLang(){
    walk(document.documentElement, toLangNode, toLangAttrs);
  }

  function restoreZh(){
    // 已被換掉的節點還原；頁面自己動態產生的內容（如 page4）重新 render 回中文
    document.querySelectorAll('[title],[alt]').forEach(el=>{
      const o = origAttr.get(el);
      if(o) Object.keys(o).forEach(a=>el.setAttribute(a, o[a]));
    });
    const w = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, SKIP);
    let n; const nodes = [];
    while((n = w.nextNode())) nodes.push(n);
    nodes.forEach(t=>{ const o = origText.get(t); if(o !== undefined && t.nodeValue !== o) t.nodeValue = o; });
    if(typeof window.render === 'function' && document.getElementById('wkStage')) window.render();
  }

  function updateLinks(l){
    document.querySelectorAll('a[href*=".html"]').forEach(a=>{
      const h = a.getAttribute('href').split('?')[0];
      a.setAttribute('href', h + '?lang=' + l);
    });
  }

  function setLang(next, persist){
    lang = next;
    document.documentElement.lang = HTML_LANG[next];
    if(persist){ try{ localStorage.setItem('deckLang', next); }catch(_){} }
    if(next === 'zh') restoreZh(); else applyLang();
    updateLinks(next);
    const box = document.getElementById('langSwitch');
    if(box) box.querySelectorAll('button').forEach(b=>b.classList.toggle('on', b.dataset.lang === next));
  }

  function buildSwitch(){
    const host = document.querySelector('.float-top');
    if(!host || document.getElementById('langSwitch')) return;
    const box = document.createElement('div');
    box.className = 'lang-switch'; box.id = 'langSwitch';
    box.innerHTML = '<button type="button" data-lang="zh">中</button><button type="button" data-lang="en">EN</button><button type="button" data-lang="ja">日</button>';
    box.addEventListener('click', e=>{
      const b = e.target.closest('button'); if(!b) return;
      e.stopPropagation();
      setLang(b.dataset.lang, true);
      if(typeof window.deckShowHint === 'function') window.deckShowHint();
    });
    host.insertBefore(box, host.firstChild);
  }

  // 在 head 先決定語言，非中文時先隱藏 body 避免先閃中文
  lang = getLang();
  if(lang !== 'zh') document.documentElement.classList.add('i18n-pending');

  document.addEventListener('DOMContentLoaded', ()=>{
    buildSwitch();
    startObserver();
    setLang(lang, false);
    document.documentElement.classList.remove('i18n-pending');
  });
  window.i18nSetLang = l=>setLang(l, true);
})();
