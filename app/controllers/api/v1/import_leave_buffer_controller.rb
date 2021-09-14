class Api::V1::ImportLeaveBufferController < ApiController


  def multiple_insert

    # params.require(:records).permit(campaign: {}, records:[:name ,:active],)
     @payload = params[:records]
     
 
     @records = ImportLeaveBuffer.all
     @created_records = []
 
 
     @payload.each { |data|
 
          data['created_at'] = Time.now
          data['updated_at'] = Time.now

          @created_records.push(data)
  
     }
 
     @res = @created_records.length
 
     if @created_records.length > 0
 
       @res = ImportLeaveBuffer.insert_all(@created_records)
 
     end

     render json: @res
   
   end
  
end
