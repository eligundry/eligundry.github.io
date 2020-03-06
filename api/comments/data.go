package comments

import (
	"database/sql"

	"github.com/eligundry/eligundry.com/api/common"
)

func CreateTable() {
	db := common.GetDB()
	db.MustExec(`
        CREATE TABLE IF NOT EXISTS comments (
            id INTEGER PRIMARY KEY,
            email TEXT NOT NULL,
            path TEXT NOT NULL,
            comment TEXT NOT NULL,
            posted_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `)
}

func CreateComment(path string, payload Payload) (int, error) {
	db := common.GetDB()
	res, err := db.Exec(`
        INSERT INTO comments (path, email, comment)
        VALUES (?, ?, ?)
	`, path, payload.Email, payload.Comment)

	if err != nil {
		return -1, err
	}

	id, err := res.LastInsertId()

	if err != nil {
		return -1, err
	}

	return int(id), nil
}

func GetCommentByID(id int) (Comment, error) {
	var comment Comment
	db := common.GetDB()
	err := db.Get(&comment, `
        SELECT *
        FROM comments
        WHERE id = ?
    `, id)

	if err != nil {
		return comment, err
	}

	return comment, nil
}

func GetCommentsByPath(path string) ([]Comment, error) {
	comments := []Comment{}
	db := common.GetDB()
	err := db.Select(&comments, `
        SELECT *
        FROM comments
        WHERE path LIKE ?
    `, path+"%")

	if err != nil && err != sql.ErrNoRows {
		return comments, err
	}

	return comments, nil
}
