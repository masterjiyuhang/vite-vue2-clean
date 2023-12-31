/**
 * feat：新增功能
 * fix：修复缺陷
 * docs：文档更新
 * style：不影响程序逻辑的代码修改（修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑）
 * refactor：代码重构
 * perf：性能提升
 * test：测试相关
 * build：构建相关
 * ci：持续集成
 * chore：不属于以上类型的其他类型，比如构建流程, 依赖管理
 * revert：回退代码
 */
/** @type {import('cz-git').UserConfig} */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [1, 'always'],
    'subject-empty': [2, 'never'],
    'type-empty': [2, 'never'],
    'subject-case': [0, 'never'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'perf', 'style', 'docs', 'test', 'refactor', 'build', 'ci', 'chore', 'revert', 'release'],
    ],
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: '选择关联issue前缀（可选）:',
      customFooterPrefixs: '输入自定义issue前缀 :',
      footer: '列举关联issue (可选) 例如: #31, #I3244 :\n',
      confirmCommit: '是否提交或修改commit ?',
    },
    types: [
      { value: 'feat', name: 'feat:     新增功能 | A new feature', emoji: '🚀' },
      { value: 'fix', name: 'fix:      修复缺陷 | A bug fix', emoji: '🧩' },
      { value: 'docs', name: 'docs:     文档更新 | Documentation only changes', emoji: '📚' },
      { value: 'style', name: 'style:    代码格式 | Changes that do not affect the meaning of the code', emoji: '🎨' },
      {
        value: 'refactor',
        name: 'refactor: 代码重构 | A code change that neither fixes a bug nor adds a feature',
        emoji: '♻️',
      },
      { value: 'perf', name: 'perf:     性能提升 | A code change that improves performance', emoji: '⚡️' },
      { value: 'test', name: 'test:     测试相关 | Adding missing tests or correcting existing tests', emoji: '✅' },
      {
        value: 'build',
        name: 'build:    构建相关 | Changes that affect the build system or external dependencies',
        emoji: '📦️',
      },
      { value: 'ci', name: 'ci:       持续集成 | Changes to our CI configuration files and scripts', emoji: '🎡' },
      { value: 'revert', name: 'revert:   回退代码 | Revert to a commit', emoji: '⏪️' },
      { value: 'chore', name: 'chore:    其他修改 | Other changes that do not modify src or test files', emoji: '🔨' },
      // { value: '特性', name: '特性:   🚀  新增功能', emoji: '🚀' },
      // { value: '修复', name: '修复:   🧩  修复缺陷', emoji: '🧩' },
      // { value: '文档', name: '文档:   📚  文档变更', emoji: '📚' },
      // { value: '格式', name: '格式:   🎨  代码格式（不影响功能，例如空格、分号等格式修正）', emoji: '🎨' },
      // { value: '重构', name: '重构:   ♻️  代码重构（不包括 bug 修复、功能新增）', emoji: '♻️' },
      // { value: '性能', name: '性能:   ⚡️  性能优化', emoji: '⚡️' },
      // { value: '测试', name: '测试:   ✅  添加疏漏测试或已有测试改动', emoji: '✅' },
      // {
      //   value: '构建',
      //   name: '构建:   📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）',
      //   emoji: '📦️',
      // },
      // { value: '集成', name: '集成:   🎡  修改 CI 配置、脚本', emoji: '🎡' },
      // { value: '回退', name: '回退:   ⏪️  回滚 commit', emoji: '⏪️' },
      // { value: '其他', name: '其他:   🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）', emoji: '🔨' },
    ],
    useEmoji: true,
    emojiAlign: 'center',
    allowCustomIssuePrefixs: false,
    allowEmptyIssuePrefixs: false,
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: 'bottom',
    customScopesAlias: 'custom',
    emptyScopesAlias: 'empty',
    upperCaseSubject: false,
    allowBreakingChanges: ['feat', 'fix'],
    breaklineNumber: 100,
    breaklineChar: '|',
    skipQuestions: [],
    issuePrefixs: [{ value: 'closed', name: 'closed:   ISSUES has been processed' }],
    customIssuePrefixsAlign: 'top',
    emptyIssuePrefixsAlias: 'skip',
    customIssuePrefixsAlias: 'custom',
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: '',
    defaultIssues: '',
    defaultScope: '',
    defaultSubject: '',
  },
};
