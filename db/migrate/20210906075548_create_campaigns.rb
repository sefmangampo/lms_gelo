class CreateCampaigns < ActiveRecord::Migration[6.1]
  def change
    create_table :campaigns do |t|
      t.string :name
      t.boolean :active
      t.string :description

      t.timestamps
    end
  end
end
