// ─────────────────────────────────────────────
// 기프트카드 안내 사이트 서버 (Express, ESM)
// Railway는 PORT 환경변수를 주입하므로 반드시 이를 사용해야 함
// ─────────────────────────────────────────────
import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";

const app = express();
const PORT = process.env.PORT ?? 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 연락처/사이트명은 코드 수정 없이 Railway Variables 에서 바꿀 수 있게 환경변수로 분리
const config = {
  siteName: process.env.SITE_NAME ?? "기프트카드 안내",
  contactUrl: process.env.CONTACT_URL ?? "#",          // 예: 카카오톡 오픈채팅 링크
  contactLabel: process.env.CONTACT_LABEL ?? "카카오톡으로 문의하기",
  surveyUrl: process.env.SURVEY_URL ?? "",              // 구글 폼 등 설문 링크
};

// 보안 헤더 (간단 버전)
app.disable("x-powered-by");
app.use((_req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  next();
});

// 프론트에서 설정값을 가져가는 엔드포인트
app.get("/config.json", (_req, res) => res.json(config));

// Railway 헬스체크용
app.get("/health", (_req, res) => res.send("ok"));

// 정적 파일(index.html) 서빙
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, "0.0.0.0", () => console.log(`Listening on :${PORT}`));
