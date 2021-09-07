class Api::V1::CampaignController < ApiController
  def index

    @campaigns= Campaign.all
 
    render json: @campaigns

  end

  def show
    set_campaign()

    render json: @campaign
  end

  def create
    @campaign = Campaign.new(campaign_params)
   
    if @campaign.save
      render json: @campaign
    else
      render json: @campaign.errors
    end
  end

  def destroy
    set_campaign()
    @campaign.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_campaign()
    if @campaign.update(campaign_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @campaign.errors
    end
  
  end

  private 

  def set_campaign
    @campaign = Campaign.find(params[:id])
  end

  def campaign_params
    params.permit(:id, :name ,:active)
  end
end
