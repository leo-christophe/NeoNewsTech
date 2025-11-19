import { Column, Entity, IsNull, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        nullable: false
    })
    title: string;

    @Column()
    description: string;
    
    @Column()
    url: string;
    
    @Column({
        nullable: true,
    })
    author?: string;

    @Column({
        nullable: true,
        type: 'varchar'
    })
    urlToImage?: string  | null;

    @Column()
    source: string;
    
    @Column()
    content: string;
    
    @Column()
    publishedAt: Date;
    
    @Column()
    fetchedAt: Date;
}
