import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialSetup1734266260141 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Users table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                role ENUM('admin', 'coach', 'player') NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // Sports table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS sports (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL UNIQUE,
                team_size INT NOT NULL,
                match_duration INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);
        
        // Groups table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS playing_groups (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                sport_id INT NOT NULL,
                coach_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE,
                FOREIGN KEY (coach_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        // Groups table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS coach_sports (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                sport_id INT NOT NULL,
                coach_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE,
                FOREIGN KEY (coach_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);

        // Players_Groups table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS players_groups (
                id INT AUTO_INCREMENT PRIMARY KEY,
                player_id INT NOT NULL,
                group_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (player_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (group_id) REFERENCES playing_groups(id) ON DELETE CASCADE
            );
        `);

        // Shifts table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS shifts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                group_id INT NOT NULL,
                start_time DATETIME NOT NULL,
                end_time DATETIME NOT NULL,
                court VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (group_id) REFERENCES playing_groups(id) ON DELETE CASCADE
            );
        `);

        // Attendance table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS attendance (
                id INT AUTO_INCREMENT PRIMARY KEY,
                shift_id INT NOT NULL,
                player_id INT NOT NULL,
                status ENUM('present', 'absent') NOT NULL DEFAULT 'absent',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (shift_id) REFERENCES shifts(id) ON DELETE CASCADE,
                FOREIGN KEY (player_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop tables in reverse order due to foreign key constraints
        await queryRunner.query(`DROP TABLE IF EXISTS attendance`);
        await queryRunner.query(`DROP TABLE IF EXISTS shifts`);
        await queryRunner.query(`DROP TABLE IF EXISTS players_groups`);
        await queryRunner.query(`DROP TABLE IF EXISTS coach_sports`);
        await queryRunner.query(`DROP TABLE IF EXISTS sports`);
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
    }
}
