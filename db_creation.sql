DROP TABLE IF EXISTS article, article_summary;

CREATE TABLE article (
	id SERIAL PRIMARY KEY,
	title VARCHAR(300) NOT NULL,
	author VARCHAR(100) NULL,
	description VARCHAR(1000) NULL,
	url VARCHAR(300) NULL,
	urlToImage VARCHAR(300) NULL,
	source VARCHAR(300) NULL,
	content VARCHAR(5000) NULL,
	publishedAt DATE NULL,
	fetchedAt DATE DEFAULT NOW()	
);

CREATE TABLE article_summary (
	id SERIAL PRIMARY KEY,
	id_article INT NOT NULL,
	summary VARCHAR(5000) NOT NULL
);
