from keras.models import load_model

reconstructed_model = load_model("debate_model_new.h5")


tokens = [[7,1,5,16,1,17,4,14,7,6,15,1,3,17,5,3,1,4,23,5,16,5,1,7,10,1,3,17,2,1,3,17,7,8,3,2,2,6,3,17,1,14,8,2,10,7,12,2,6,3,1,4,21,1,13,10,5]]
pred = reconstructed_model.predict(tokens)

print(pred)