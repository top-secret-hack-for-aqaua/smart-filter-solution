"""add table rejections for childs 4

Revision ID: 182c68fd2d73
Revises: 88fcc5e726de
Create Date: 2024-05-18 11:15:08.292875

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '182c68fd2d73'
down_revision: Union[str, None] = '88fcc5e726de'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('childrenrejections', sa.Column('category_name', sa.Integer(), nullable=False))
    op.drop_constraint('childrenrejections_category_id_fkey', 'childrenrejections', type_='foreignkey')
    op.create_foreign_key(None, 'childrenrejections', 'videocategory', ['category_name'], ['id'])
    op.drop_column('childrenrejections', 'category_id')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('childrenrejections', sa.Column('category_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'childrenrejections', type_='foreignkey')
    op.create_foreign_key('childrenrejections_category_id_fkey', 'childrenrejections', 'videocategory', ['category_id'], ['id'])
    op.drop_column('childrenrejections', 'category_name')
    # ### end Alembic commands ###
