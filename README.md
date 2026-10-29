# sirsoft-comm

Gnuboard7의 게시판 중심 사용자 사이트용 템플릿입니다. 이 디렉터리는 `sirsoft-comm` 식별자를 유지하는 템플릿 배포 원본입니다.

## 지원 및 요구 사항

- Gnuboard7: `template.json`의 `g7_version` 기준 `>=7.0.0-beta.2`. 이 값은 매니페스트 선언이며, 모든 코어 버전에서의 실제 기능 검증을 뜻하지 않습니다.
- 필수 확장(매니페스트 기준):
  - 모듈 `sirsoft-board` `>=1.0.0-beta.2`
  - 모듈 `sirsoft-page` `>=1.0.0-beta.2`
  - 플러그인 `sirsoft-daum_postcode` `>=1.0.0-beta.2`
- 언어: 한국어(`ko`), 영어(`en`)

의존 모듈과 플러그인을 먼저 설치하고 활성화하십시오. 설치와 활성화는 사이트의 확장 관리 정책에 따라 관리자 권한으로 진행합니다.

## 설치

### Gnuboard7 번들 소스에서

이 디렉터리가 `templates/_bundled/sirsoft-comm/`에 있는 Gnuboard7 체크아웃에서 다음 명령을 실행합니다.

```bash
php artisan template:install sirsoft-comm
php artisan template:activate sirsoft-comm
```

### 템플릿 ZIP 업로드

Gnuboard7 관리자 템플릿 설치 화면에서 ZIP 설치 기능을 사용할 수 있습니다. ZIP 루트에는 `template.json`이 있어야 하며, 매니페스트의 `identifier`는 `sirsoft-comm`이어야 합니다. ZIP에는 템플릿의 레이아웃, 언어 리소스, 컴포넌트 매니페스트 및 매니페스트가 참조하는 `dist/` 파일을 포함하십시오. ZIP 업로드 설치는 코어의 `TemplateService::installFromZipFile()` 경로를 사용합니다.

설치 후 템플릿을 명시적으로 활성화해야 합니다. 사용자 사이트 템플릿 활성화는 기존 사용자 사이트 템플릿을 대체할 수 있으므로, 현재 활성 템플릿과 의존성을 먼저 확인하십시오.

## 업데이트

번들 원본을 사용하는 Gnuboard7 체크아웃에서는 다음 명령으로 업데이트합니다.

```bash
php artisan template:update sirsoft-comm --source=bundled --layout-strategy=keep
```

외부에서 받은 ZIP으로 이미 설치된 템플릿을 갱신할 때는 해당 코어 버전이 지원하는 `template:update`의 `--zip` 옵션을 사용할 수 있습니다. 레이아웃은 코어의 `keep` 병합 정책에 따라 처리됩니다. 업데이트 전에 데이터와 운영자 수정 레이아웃을 별도로 백업하십시오.

새 버전 설치 및 업데이트는 템플릿 lifecycle 명령 또는 관리자 UI로만 수행하십시오. 활성 템플릿 디렉터리에 파일을 직접 복사하지 마십시오.

## 배포 파일과 자산

설치에는 `template.json`, `components.json`, `routes.json`, `layouts/`, `lang/`, 필요한 `extensions/` 파일 및 `template.json`의 `assets`가 가리키는 다음 배포 자산이 필요합니다.

- `dist/css/components.css`
- `dist/js/components.iife.js`

현재 배포 JS에는 `Section` export가 포함되어 있습니다. 빌드 재현에 필요한 `package.json`과 템플릿별 빌드 설정은 이 배포 디렉터리에 없어, 이 README 작성 시점에는 정식 재빌드가 확인되지 않았습니다. 따라서 기존 검증된 배포 자산을 보존했습니다. JS 안의 `templateMetadata.version`은 `1.0.0-beta.6`이고 매니페스트는 `1.0.0-beta.11`입니다. 코어의 확인된 자산 캐시 식별자는 별도 설정이며 이 내장 버전 문자열을 배포 갱신 수단으로 사용하지 않습니다.

## 이 배포본의 변경 사항

- SC-02: 라우트 제목 참조를 번역 정의와 맞추고, 게시판 목록(`Board List` / `게시판 목록`)과 게시글 보기(`View Post` / `게시글 보기`) 키를 한국어·영어에 추가했습니다.
- SC-03: `Section` 컴포넌트를 basic 컴포넌트 매니페스트에 등록했습니다. 기존 `SectionLayout`과 레이아웃 구조는 유지했습니다.
- beta.10: 설치 및 업데이트 안내, 배포 자산 상태, 저작권과 제한 사항을 문서화했습니다.
- beta.11: 배포 JS/CSS에서 확인된 제3자 라이브러리의 라이선스·저작권 고지와 버전 식별 한계를 기록했습니다.

이 변경 기록은 현재 작업 트리에서 확인한 로컬 변경을 요약합니다. 이는 upstream 승인이나 공식 릴리스라는 주장이 아닙니다. 매니페스트의 upstream 저장소 링크는 upstream 프로젝트를 가리키며, 이 README의 로컬 문서 보완을 upstream에 반영하지 않습니다.

## 라이선스와 저작권

배포본의 `LICENSE`에 기재된 MIT 조건과 저작권 고지를 유지해야 합니다. 해당 파일은 SIRSOFT와 Glitter.kr의 저작권 표시를 포함합니다. 재배포 시 LICENSE를 함께 포함하고 고지를 보존하십시오.

배포 JS/CSS에서 확인한 제3자 코드와 저작권·라이선스 고지는 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)에 기록되어 있습니다. 재배포 시 이 파일과 기존 `LICENSE`를 함께 포함하고 고지를 보존하십시오. 이 문서는 upstream 승인 또는 인증을 뜻하지 않습니다.

## 알려진 제한 및 미검증 항목

- 선언된 최소 Gnuboard7 버전과 필수 확장 버전은 `template.json`에 근거합니다. 이 안내 작성 과정에서 새 설치 환경의 기능 테스트는 실행하지 않았습니다.
- 템플릿별 빌드 구성이 없어 배포 JS/CSS를 재생성하지 않았습니다. JS 메타데이터 버전은 `1.0.0-beta.6`이며 매니페스트 `1.0.0-beta.11`과 다릅니다. 이전 정적 분석에서 내장 버전은 실행 제어나 캐시 키에 사용되지 않는 것으로 확인되어 기존 자산을 보존했습니다.
- 브라우저 동작, 새 사이트 설치, 레이아웃 병합 결과는 이 문서 작업에서 검증하지 않았습니다.
- ZIP 배포 시에도 코어가 요구하는 템플릿 파일과 디렉터리 구조를 유지하고, ZIP 루트에서 `template.json`을 찾을 수 있어야 합니다.
