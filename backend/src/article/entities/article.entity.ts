import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  /**
   * Identifiant unique de l'article (BigInt).
   * @example 123456789
   */
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  /**
   * Titre de l'article.
   * Doit être unique dans la base. Peut être nul si la source ne le fournit pas.
   * @example "Les nouvelles avancées en IA"
   */
  @Column({ type: 'varchar', length: 550, unique: true, nullable: true })
  title?: string;

  /**
   * Résumé ou description courte de l'article.
   * @example "Une analyse approfondie sur..."
   */
  @Column({ type: 'varchar', length: 750, nullable: true })
  description?: string | null;

  /**
   * Lien direct vers l'article original.
   * Sert souvent d'identifiant unique fonctionnel pour éviter les doublons.
   * @example "https://lemonde.fr/sciences/article-123.html"
   */
  @Column({ type: 'varchar', length: 2048, unique: true, nullable: true })
  url?: string;

  /**
   * Nom de l'auteur ou de l'agence de presse.
   * @example "Jean Dupont"
   */
  @Column({ type: 'varchar', length: 255, nullable: true })
  author?: string;

  /**
   * URL de l'image de couverture.
   * @example "https://images.source.com/img.jpg"
   */
  @Column({ type: 'varchar', length: 2048, nullable: true })
  urlToImage?: string | null;

  /**
   * Nom de la source d'origine.
   * @example "TechCrunch"
   */
  @Column({ type: 'varchar', length: 300, nullable: false })
  source: string;

  /**
   * Extrait du contenu ou contenu complet (limité à 220 caractères).
   * @example "Voici le début de l'article qui parle de..."
   */
  @Column({ type: 'varchar', length: 220, nullable: true })
  content?: string;

  /**
   * Date de publication originale de l'article.
   * Indexée pour optimiser les tris chronologiques.
   */
  @Index('idx_published_at')
  @Column({ type: 'timestamp', nullable: false })
  publishedAt: Date;

  /**
   * Date à laquelle l'article a été importé dans notre base.
   * Par défaut : date et heure actuelles.
   */
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fetchedAt: Date;

  /**
   * Date d'archivage (Soft Delete).
   * Si rempli, l'article est considéré comme lu.
   */
  @Index('idx_archived_at')
  @Column({ type: 'timestamp', nullable: true, default: null })
  archivedAt?: Date;
}
