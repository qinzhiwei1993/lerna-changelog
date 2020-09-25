module.exports = {
    extends: ['@commitlint/config-conventional'], // 默认集成
    // parserPreset: 'conventional-changelog-conventionalcommits',
    rules: {
        // 'body-leading-blank': [1, 'always'], // 空格开头
        // 'body-max-line-length': [2, 'always', 100], // body最多100行
        // 'footer-leading-blank': [1, 'always'], // 空格开头
        // 'footer-max-line-length': [2, 'always', 100], // footer 最多行数
        // 'header-max-length': [2, 'always', 100],
        'scope-empty': [0, 'never'], // scope非必填
        'scope-case': [
            2,
            'always',
            [
                'lower-case', // default
                'upper-case', // UPPERCASE
                'camel-case', // camelCase
                'kebab-case', // kebab-case
                'pascal-case', // PascalCase
                'sentence-case', // Sentence case
                'snake-case', // snake_case
                'start-case' // Start Case
            ]
        ], // scope小写
        'subject-case': [
            2,
            'never',
            [
                'lower-case', // default
                'upper-case', // UPPERCASE
                'camel-case', // camelCase
                'kebab-case', // kebab-case
                'pascal-case', // PascalCase
                'sentence-case', // Sentence case
                'snake-case', // snake_case
                'start-case' // Start Case
            ]
        ],
        // 'subject-empty': [2, 'never'],
        // 'subject-full-stop': [2, 'never', '.'],
        // 'type-case': [2, 'always', 'lower-case'],
        // 'type-empty': [2, 'never'],
        // 'type-enum': [
        // 	2,
        // 	'always',
        // 	[
        // 		'build',
        // 		'chore',
        // 		'ci',
        // 		'docs',
        // 		'feat',
        // 		'fix',
        // 		'perf',
        // 		'refactor',
        // 		'revert',
        // 		'style',
        // 		'test',
        // 	],
        // ],
    },
}
