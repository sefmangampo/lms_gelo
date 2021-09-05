class Api::V1::CutOffController < ApiController
  def index
    @cut_offs = CutOff.all
    render json: @cut_offs
  end

  def show
    set_cut_off()
    render json: @cut_off
  end

  def create
    @cut_off = CutOff.new(cut_off_params)
   
    if @cut_off.save
      render json: @cut_off
    else
      render json: @cut_off.errors
    end
  end

  def destroy
    set_cut_off()
    @cut_off.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_cut_off()
    if @cut_off.update(cut_off_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @cut_off.errors
    end
  
  end

  private 

    def set_cut_off
      @cut_off = CutOff.find(params[:id])
    end

    def cut_off_params
      params.permit(:id, :name,:paymentmodetype, :startdate, :enddate, :active)
    end

end
