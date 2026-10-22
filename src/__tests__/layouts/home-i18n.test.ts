import { describe, expect, it, beforeEach } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { TranslationEngine, type TranslationContext } from '@/core/template-engine/TranslationEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templateRoot = path.resolve(__dirname, '..', '..', '..');

function readText(relativePath: string): string {
  return readFileSync(path.join(templateRoot, relativePath), 'utf-8');
}

function readJson<T>(relativePath: string): T {
  return JSON.parse(readText(relativePath)) as T;
}

function loadDictionary(locale: 'ko' | 'en') {
  const manifest = readJson<Record<string, any>>(`lang/${locale}.json`);

  return Object.fromEntries(
    Object.entries(manifest).map(([key, value]) => {
      if (value && typeof value === 'object' && typeof value.$partial === 'string') {
        return [key, readJson(`lang/${value.$partial}`)];
      }

      return [key, value];
    })
  );
}

describe('home layout i18n enforcement', () => {
  const koContext: TranslationContext = {
    templateId: 'sirsoft-comm',
    locale: 'ko',
  };

  const enContext: TranslationContext = {
    templateId: 'sirsoft-comm',
    locale: 'en',
  };

  beforeEach(() => {
    TranslationEngine.resetInstance();
    const engine = TranslationEngine.getInstance();
    (engine as any).translations.set('sirsoft-comm:ko', loadDictionary('ko'));
    (engine as any).translations.set('sirsoft-comm:en', loadDictionary('en'));
  });

  it('uses translation keys instead of hardcoded homepage text in touched partials', () => {
    const welcomeCard = readText('layouts/partials/home/_welcome_card.json');
    const communityNoticePanel = readText('layouts/partials/home/_community_notice_panel.json');
    const noticePosts = readText('layouts/partials/home/_notice_posts.json');
    const startPost = readText('layouts/partials/home/_start_post.json');
    const communityHub = readText('layouts/partials/home/_community_hub.json');
    const liveActivity = readText('layouts/partials/home/_live_activity.json');
    const boardDiscovery = readText('layouts/partials/home/_board_discovery.json');
    const communityGuide = readText('layouts/partials/home/_community_guide.json');
    const recentPosts = readText('layouts/partials/home/_recent_posts.json');
    const popularBoards = readText('layouts/partials/home/_popular_boards.json');
    const homeLayout = readText('layouts/home.json');

    expect(welcomeCard).toContain('$t:home.hero_title');
    expect(welcomeCard).toContain('$t:home.smart_cta.guest_message');
    expect(welcomeCard).toContain('$t:home.smart_cta.new_member_message');
    expect(welcomeCard).toContain('$t:home.smart_cta.active_member_message');
    expect(welcomeCard).not.toContain('Sir Soft Community');
    expect(welcomeCard).not.toContain('"text": "Ask questions after logging in."');
    expect(welcomeCard).not.toContain('"text": "로그인 후 질문을 남길 수 있습니다."');
    expect(welcomeCard).not.toContain('{{_global.settings?.general?.site_name}}$t:home.hero_title_suffix');

    expect(homeLayout).toContain('partials/home/_community_notice_panel.json');
    expect(homeLayout).not.toContain('partials/home/_notice_posts.json');
    expect(homeLayout).toContain('partials/home/_start_post.json');
    expect(homeLayout).toContain('partials/home/_community_hub.json');
    expect(homeLayout).toContain('partials/home/_live_activity.json');
    expect(homeLayout).toContain('partials/home/_board_discovery.json');
    expect(homeLayout).not.toContain('partials/home/_board_summary.json');
    expect(homeLayout).not.toContain('"id": "home_boards"');

    expect(communityNoticePanel).toContain('$t:home.community_notice_panel.title');
    expect(communityNoticePanel).toContain('$t:home.community_notice_panel.description');
    expect(communityNoticePanel).toContain('$t:home.community_notice_panel.view_notices');
    expect(communityNoticePanel).toContain('$t:home.community_notice_panel.empty_title');
    expect(communityNoticePanel).toContain('$t:home.community_notice_panel.guidance_1');
    expect(communityNoticePanel).toContain('$t:home.community_notice_panel.guidance_2');
    expect(communityNoticePanel).toContain('$t:home.community_notice_panel.guidance_3');
    expect(communityNoticePanel).toContain('$t:boards.notice');
    expect(communityNoticePanel).toContain('$t:board.new_badge');
    expect(communityNoticePanel).toContain('/board/notice');
    expect(communityNoticePanel).not.toContain('"text": "Community Notices"');
    expect(communityNoticePanel).not.toContain('"text": "커뮤니티 공지"');

    expect(noticePosts).toContain('$t:home.notice_posts');
    expect(noticePosts).toContain('$t:boards.notice');
    expect(noticePosts).toContain('$t:board.new_badge');
    expect(noticePosts).not.toContain('"text": "N"');

    expect(startPost).toContain('$t:home.start_post_title');
    expect(startPost).toContain('$t:home.start_post_description');
    expect(startPost).toContain('$t:boards.free');
    expect(startPost).toContain('$t:boards.qna');
    expect(startPost).toContain('$t:home.start_post_free_description');
    expect(startPost).toContain('$t:home.start_post_qna_description');
    expect(startPost).not.toContain('$t:boards.notice');
    expect(startPost).not.toContain('/board/notice/write');

    expect(recentPosts).toContain('$t:board.new_badge');
    expect(recentPosts).toContain('$t:home.comment_count_badge|count={{post?.comment_count ?? 0}}');
    expect(recentPosts).not.toContain('"text": "N"');
    expect(recentPosts).not.toContain('"text": "[{{post.comment_count}}]"');
    expect(recentPosts).toContain('$t:boards.notice');
    expect(recentPosts).toContain('$t:boards.free');
    expect(recentPosts).toContain('$t:boards.qna');
    expect(recentPosts).toContain('$t:boards.resources');
    expect(recentPosts).toContain('$t:boards.introductions');
    expect(recentPosts).toContain('$t:boards.support');
    expect(popularBoards).toContain('$t:boards.notice');
    expect(popularBoards).toContain('$t:boards.free');
    expect(popularBoards).toContain('$t:boards.qna');
    expect(popularBoards).toContain('$t:boards.resources');
    expect(popularBoards).toContain('$t:boards.introductions');
    expect(popularBoards).toContain('$t:boards.support');

    expect(communityHub).toContain('$t:home.community_hub.title');
    expect(communityHub).toContain('$t:home.community_hub.recent_activity');
    expect(communityHub).toContain('$t:home.community_hub.board_shortcuts');
    expect(communityHub).toContain('$t:home.community_hub.qna_title');
    expect(communityHub).toContain('$t:home.community_hub.first_run_title');
    expect(communityHub).toContain('$t:boards.free');
    expect(communityHub).not.toContain('"text": "Community Hub"');
    expect(communityHub).not.toContain('"text": "커뮤니티 허브"');

    expect(liveActivity).toContain('$t:home.live_activity.title');
    expect(liveActivity).toContain('$t:home.live_activity.new_post');
    expect(liveActivity).toContain('$t:home.live_activity.new_comment');
    expect(liveActivity).toContain('$t:home.live_activity.empty_title');
    expect(liveActivity).not.toContain('"text": "Live Activity"');
    expect(liveActivity).not.toContain('"text": "실시간 활동"');

    expect(boardDiscovery).toContain('$t:home.board_discovery.title');
    expect(boardDiscovery).toContain('$t:home.board_discovery.purpose_notice');
    expect(boardDiscovery).toContain('$t:home.board_discovery.purpose_free');
    expect(boardDiscovery).toContain('$t:home.board_discovery.purpose_qna');
    expect(boardDiscovery).toContain('$t:home.board_discovery.purpose_resources');
    expect(boardDiscovery).toContain('$t:home.board_discovery.purpose_introductions');
    expect(boardDiscovery).toContain('$t:home.board_discovery.purpose_support');
    expect(boardDiscovery).toContain('$t:home.board_discovery.empty_title');
    expect(boardDiscovery).toContain('$t:boards.notice');
    expect(boardDiscovery).toContain('$t:boards.free');
    expect(boardDiscovery).toContain('$t:boards.qna');
    expect(boardDiscovery).toContain('$t:boards.resources');
    expect(boardDiscovery).toContain('$t:boards.introductions');
    expect(boardDiscovery).toContain('$t:boards.support');
    expect(boardDiscovery).not.toContain('"text": "Board Discovery"');
    expect(boardDiscovery).not.toContain('"text": "게시판 탐색"');

    expect(communityGuide).toContain('$t:home.guide_bullet');
    expect(communityGuide).not.toContain('"text": "•"');
  });

  it('loads starter board names from the template language manifest', () => {
    const koManifest = readJson<Record<string, any>>('lang/ko.json');
    const enManifest = readJson<Record<string, any>>('lang/en.json');

    expect(koManifest.boards?.$partial).toBe('partial/ko/boards.json');
    expect(enManifest.boards?.$partial).toBe('partial/en/boards.json');
  });

  it('uses Button variant and size props for the primary hero CTA', () => {
    const welcomeCard = readJson<any>('layouts/partials/home/_welcome_card.json');
    const cta = welcomeCard.children[3].children[3].children[0].children[1];

    expect(cta.name).toBe('Button');
    expect(cta.props.variant).toBe('primary');
    expect(cta.props.size).toBe('md');
    expect(cta.props.className).toBe('gap-2 cursor-pointer self-start');
    expect(cta.props.className).not.toContain('btn-primary-bg');
    expect(cta.props.className).not.toMatch(/\bbg-amber-/);
    expect(cta.props.className).not.toMatch(/\btext-amber-/);
    expect(cta.props.className).not.toMatch(/\bborder-amber-/);
  });

  it('uses board-specific write actions from the homepage start-post choices', () => {
    const startPost = readJson<any>('layouts/partials/home/_start_post.json');
    const choices = startPost.children[0].children[1].children;
    const [qnaChoice, freeChoice] = choices;

    expect(choices).toHaveLength(2);
    expect(qnaChoice.props.variant).toBe('primary');
    expect(qnaChoice.props.className).toContain('bg-sky-600');
    expect(freeChoice.props.variant).toBe('secondary');
    expect(freeChoice.props.className).toContain('bg-white');

    expect(qnaChoice.actions[0].handler).toBe('switch');
    expect(qnaChoice.actions[0].params.value).toBe("{{_global.currentUser?.uuid ? 'authenticated' : 'guest'}}");
    expect(qnaChoice.actions[0].cases.authenticated.params.path).toBe('/board/qna/write');
    expect(qnaChoice.actions[0].cases.guest.params.path).toBe('/login');
    expect(qnaChoice.actions[0].cases.guest.params.query.redirect).toBe('/board/qna/write');

    expect(freeChoice.actions[0].handler).toBe('switch');
    expect(freeChoice.actions[0].params.value).toBe("{{_global.currentUser?.uuid ? 'authenticated' : 'guest'}}");
    expect(freeChoice.actions[0].cases.authenticated.params.path).toBe('/board/free/write');
    expect(freeChoice.actions[0].cases.guest.params.path).toBe('/login');
    expect(freeChoice.actions[0].cases.guest.params.query.redirect).toBe('/board/free/write');
  });

  it('renders homepage text correctly in Korean mode', () => {
    const engine = TranslationEngine.getInstance();

    expect(engine.translate('home.hero_title', koContext)).toBe('커뮤니티 스타터');
    expect(engine.translate('home.seo_title', koContext)).toBe('커뮤니티 스타터');
    expect(engine.translate('home.notice_posts', koContext)).toBe('공지사항');
    expect(engine.translate('home.community_notice_panel.title', koContext)).toBe('커뮤니티 공지');
    expect(engine.translate('home.community_notice_panel.description', koContext)).toBe('중요 안내, 운영 메모, 시작 방법을 전하는 공간입니다.');
    expect(engine.translate('home.community_notice_panel.view_notices', koContext)).toBe('공지사항 보기');
    expect(engine.translate('home.community_notice_panel.empty_title', koContext)).toBe('커뮤니티를 열 때 첫 공지를 게시하세요');
    expect(engine.translate('home.community_notice_panel.guidance_1', koContext)).toBe('커뮤니티의 목적과 환영하는 대상을 안내합니다.');
    expect(engine.translate('home.start_post_title', koContext)).toBe('글을 시작할 게시판을 선택하세요');
    expect(engine.translate('home.start_post_free_description', koContext)).toBe('일상 이야기와 자유로운 주제를 나눕니다.');
    expect(engine.translate('home.start_post_qna_description', koContext)).toBe('질문과 도움이 필요한 내용을 남깁니다.');
    expect(engine.translate('home.recent_posts_empty_title', koContext)).toBe('첫 대화를 시작할 준비가 되었습니다');
    expect(engine.translate('home.popular_boards_empty_title', koContext)).toBe('활동에 따라 인기 게시판이 정렬됩니다');
    expect(engine.translate('home.empty_browse_boards', koContext)).toBe('게시판 목록 보기');
    expect(engine.translate('home.community_hub.title', koContext)).toBe('커뮤니티 허브');
    expect(engine.translate('home.community_hub.recent_activity', koContext)).toBe('최근 활동');
    expect(engine.translate('home.community_hub.qna_title', koContext)).toBe('답변이 필요하신가요?');
    expect(engine.translate('home.community_hub.first_run_title', koContext)).toBe('초기 운영 가이드');
    expect(engine.translate('home.smart_cta.guest_message', koContext)).toBe('로그인 후 질문을 남길 수 있습니다.');
    expect(engine.translate('home.smart_cta.new_member_button', koContext)).toBe('질문게시판에 작성');
    expect(engine.translate('home.smart_cta.active_member_button', koContext)).toBe('활동 이어가기');
    expect(engine.translate('home.live_activity.title', koContext)).toBe('실시간 활동');
    expect(engine.translate('home.live_activity.new_post', koContext)).toBe('게시글 작성');
    expect(engine.translate('home.live_activity.new_comment', koContext)).toBe('댓글 활동');
    expect(engine.translate('home.board_discovery.title', koContext)).toBe('게시판 탐색');
    expect(engine.translate('home.board_discovery.purpose_qna', koContext)).toBe('질문, 답변, 추가 도움을 주고받는 공간입니다.');
    expect(engine.translate('home.board_discovery.purpose_resources', koContext)).toBe('자료, 링크, 문서를 모아두는 공간입니다.');
    expect(engine.translate('home.board_discovery.purpose_introductions', koContext)).toBe('새 멤버가 인사하고 자신을 소개하는 공간입니다.');
    expect(engine.translate('home.board_discovery.purpose_support', koContext)).toBe('이용 중 필요한 도움과 문제 상황을 공유하는 공간입니다.');
    expect(engine.translate('home.board_discovery.empty_title', koContext)).toBe('아직 탐색할 게시판이 없습니다');
    expect(engine.translate('home.comment_count_badge', koContext, '|count=12')).toBe('[12]');
    expect(engine.translate('home.guide_bullet', koContext)).toBe('•');
    expect(engine.translate('board.new_badge', koContext)).toBe('NEW');
    expect(engine.translate('boards.notice', koContext)).toBe('공지사항');
    expect(engine.translate('boards.free', koContext)).toBe('자유게시판');
    expect(engine.translate('boards.qna', koContext)).toBe('질문게시판');
    expect(engine.translate('boards.resources', koContext)).toBe('자료실');
    expect(engine.translate('boards.introductions', koContext)).toBe('가입인사');
    expect(engine.translate('boards.support', koContext)).toBe('도움게시판');
    expect(engine.translate('boards.notice', koContext)).not.toBe('boards.notice');
    expect(engine.translate('boards.free', koContext)).not.toBe('boards.free');
    expect(engine.translate('boards.qna', koContext)).not.toBe('boards.qna');
  });

  it('renders homepage text correctly in English mode', () => {
    const engine = TranslationEngine.getInstance();

    expect(engine.translate('home.hero_title', enContext)).toBe('Community Starter');
    expect(engine.translate('home.seo_title', enContext)).toBe('Community Starter');
    expect(engine.translate('home.notice_posts', enContext)).toBe('Notice');
    expect(engine.translate('home.community_notice_panel.title', enContext)).toBe('Community Notices');
    expect(engine.translate('home.community_notice_panel.description', enContext)).toBe('Use this space for essential updates, operating notes, and first steps.');
    expect(engine.translate('home.community_notice_panel.view_notices', enContext)).toBe('View notices');
    expect(engine.translate('home.community_notice_panel.empty_title', enContext)).toBe('Publish a notice when the community opens');
    expect(engine.translate('home.community_notice_panel.guidance_1', enContext)).toBe('Share what the community is for and who it welcomes.');
    expect(engine.translate('home.start_post_title', enContext)).toBe('Choose where to start your post');
    expect(engine.translate('home.start_post_free_description', enContext)).toBe('Share everyday topics and open discussion.');
    expect(engine.translate('home.start_post_qna_description', enContext)).toBe('Ask questions and get help from the community.');
    expect(engine.translate('home.recent_posts_empty_title', enContext)).toBe('Ready for the first discussion');
    expect(engine.translate('home.popular_boards_empty_title', enContext)).toBe('Popular boards will be ranked by activity');
    expect(engine.translate('home.empty_browse_boards', enContext)).toBe('View board list');
    expect(engine.translate('home.community_hub.title', enContext)).toBe('Community Hub');
    expect(engine.translate('home.community_hub.recent_activity', enContext)).toBe('Recent activity');
    expect(engine.translate('home.community_hub.qna_title', enContext)).toBe('Need an answer?');
    expect(engine.translate('home.community_hub.first_run_title', enContext)).toBe('First-run guide');
    expect(engine.translate('home.smart_cta.guest_message', enContext)).toBe('Ask questions after logging in.');
    expect(engine.translate('home.smart_cta.new_member_button', enContext)).toBe('Ask in Q&A');
    expect(engine.translate('home.smart_cta.active_member_button', enContext)).toBe('Continue activity');
    expect(engine.translate('home.live_activity.title', enContext)).toBe('Live Activity');
    expect(engine.translate('home.live_activity.new_post', enContext)).toBe('posted in');
    expect(engine.translate('home.live_activity.new_comment', enContext)).toBe('commented in');
    expect(engine.translate('home.board_discovery.title', enContext)).toBe('Board Discovery');
    expect(engine.translate('home.board_discovery.purpose_qna', enContext)).toBe('Questions, answers, and follow-up help.');
    expect(engine.translate('home.board_discovery.purpose_resources', enContext)).toBe('Files, links, and reference material.');
    expect(engine.translate('home.board_discovery.purpose_introductions', enContext)).toBe('A place for new members to introduce themselves.');
    expect(engine.translate('home.board_discovery.purpose_support', enContext)).toBe('Help requests and issues that need community support.');
    expect(engine.translate('home.board_discovery.empty_title', enContext)).toBe('No boards to discover yet');
    expect(engine.translate('home.comment_count_badge', enContext, '|count=12')).toBe('[12]');
    expect(engine.translate('home.guide_bullet', enContext)).toBe('•');
    expect(engine.translate('board.new_badge', enContext)).toBe('NEW');
    expect(engine.translate('boards.notice', enContext)).toBe('Notice');
    expect(engine.translate('boards.free', enContext)).toBe('Free Board');
    expect(engine.translate('boards.qna', enContext)).toBe('Q&A Board');
    expect(engine.translate('boards.resources', enContext)).toBe('Resources');
    expect(engine.translate('boards.introductions', enContext)).toBe('Introductions');
    expect(engine.translate('boards.support', enContext)).toBe('Support');
    expect(engine.translate('boards.notice', enContext)).not.toBe('boards.notice');
    expect(engine.translate('boards.free', enContext)).not.toBe('boards.free');
    expect(engine.translate('boards.qna', enContext)).not.toBe('boards.qna');
  });

  it('changes homepage hero text when the locale changes', () => {
    const engine = TranslationEngine.getInstance();

    const korean = engine.translate('home.hero_description', koContext);
    const english = engine.translate('home.hero_description', enContext);

    expect(korean).toBe('게시판, 게시글, 회원 대화를 자연스럽게 시작할 수 있는 범용 공개 커뮤니티 홈입니다.');
    expect(english).toBe('A universal starting point for boards, posts, and member discussions in a public community.');
    expect(korean).not.toBe(english);
  });

  it('renders the community policy page text from template i18n only', () => {
    const engine = TranslationEngine.getInstance();
    const layout = readText('layouts/page/policy.json');

    expect(layout).toContain('$t:policy.title');
    expect(layout).toContain('$t:policy.introduction.body');
    expect(layout).toContain('$t:policy.rules.items.0');
    expect(layout).toContain('$t:policy.prohibited.items.0');
    expect(layout).toContain('$t:policy.enforcement.body');
    expect(layout).not.toContain('/api/modules/sirsoft-page');
    expect(layout).not.toContain('page?.data');

    expect(engine.translate('policy.title', koContext)).toBe('커뮤니티 정책');
    expect(engine.translate('policy.introduction.title', koContext)).toBe('소개');
    expect(engine.translate('policy.rules.title', koContext)).toBe('이용 규칙');
    expect(engine.translate('policy.rules.items.0', koContext)).toBe('게시글과 댓글은 해당 게시판의 주제와 목적에 맞게 작성합니다.');
    expect(engine.translate('policy.prohibited.title', koContext)).toBe('금지 행위');
    expect(engine.translate('policy.enforcement.title', koContext)).toBe('신고 및 운영 조치');

    expect(engine.translate('policy.title', enContext)).toBe('Community Policy');
    expect(engine.translate('policy.introduction.title', enContext)).toBe('Introduction');
    expect(engine.translate('policy.rules.title', enContext)).toBe('Usage Rules');
    expect(engine.translate('policy.rules.items.0', enContext)).toBe('Write posts and comments in the board that best matches the topic and purpose.');
    expect(engine.translate('policy.prohibited.title', enContext)).toBe('Prohibited Behavior');
    expect(engine.translate('policy.enforcement.title', enContext)).toBe('Reporting and Enforcement');
    expect(engine.translate('policy.title', koContext)).not.toBe(engine.translate('policy.title', enContext));
  });
});
