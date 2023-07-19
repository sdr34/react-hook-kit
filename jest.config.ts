export default {
	roots: ['<rootDir>/src'],
	transform: {
		'^.+\\.tsx?$': 'ts-jest',
	},
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testTimeout: 20000, // Установка таймаута в 10 секунд для всех тестов
	verbose: true,
    testEnvironment: 'jsdom',
};
